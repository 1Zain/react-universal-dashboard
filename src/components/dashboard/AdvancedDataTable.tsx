import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'action';
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
  editable?: boolean;
  inputType?: 'text' | 'email' | 'number' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
}

export interface TableData {
  id: string;
  [key: string]: any;
}

interface AdvancedDataTableProps {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: TableData[];
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  addable?: boolean;
  editable?: boolean;
  deletable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: TableData) => void;
  onAdd?: (data: Partial<TableData>) => void;
  onEdit?: (id: string, data: Partial<TableData>) => void;
  onDelete?: (id: string) => void;
  onExport?: () => void;
  className?: string;
}

export const AdvancedDataTable = ({
  title,
  description,
  columns,
  data,
  searchable = true,
  filterable = true,
  exportable = true,
  addable = true,
  editable = true,
  deletable = true,
  pagination = true,
  pageSize = 10,
  onRowClick,
  onAdd,
  onEdit,
  onDelete,
  onExport,
  className
}: AdvancedDataTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<TableData | null>(null);
  const [newRowData, setNewRowData] = useState<Partial<TableData>>({});
  const [editRowData, setEditRowData] = useState<Partial<TableData>>({});

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter(row => {
      const matchesSearch = !searchQuery || 
        Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesFilters = Object.entries(filters).every(([key, value]) => 
        !value || value === "all" || String(row[key]).toLowerCase().includes(value.toLowerCase())
      );
      
      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, filters]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const renderCell = (column: TableColumn, row: TableData) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    switch (column.type) {
      case 'badge':
        return (
          <Badge variant="outline" className="capitalize">
            {String(value)}
          </Badge>
        );
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return String(value);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(newRowData);
      setNewRowData({});
      setIsAddDialogOpen(false);
      toast.success("Record added successfully");
    }
  };

  const handleEdit = () => {
    if (onEdit && editingRow) {
      onEdit(editingRow.id, editRowData);
      setEditingRow(null);
      setEditRowData({});
      setIsEditDialogOpen(false);
      toast.success("Record updated successfully");
    }
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      toast.success("Record deleted successfully");
    }
  };

  const openEditDialog = (row: TableData) => {
    setEditingRow(row);
    setEditRowData({ ...row });
    setIsEditDialogOpen(true);
  };

  const renderInput = (column: TableColumn, value: any, onChange: (value: any) => void) => {
    switch (column.inputType) {
      case 'select':
        return (
          <Select value={value || undefined} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${column.label}`} />
            </SelectTrigger>
            <SelectContent>
              {column.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${column.label}`}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${column.label}`}
          />
        );
      default:
        return (
          <Input
            type={column.inputType || 'text'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${column.label}`}
          />
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            {addable && (
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Record</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new record.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    {columns
                      .filter(col => col.editable !== false && col.type !== 'action')
                      .map(column => (
                        <div key={column.key} className="space-y-2">
                          <Label htmlFor={column.key}>{column.label}</Label>
                          {renderInput(column, newRowData[column.key] || '', (value) => 
                            setNewRowData(prev => ({ ...prev, [column.key]: value }))
                          )}
                        </div>
                      ))}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAdd}>
                      Add Record
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {exportable && (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        {(searchable || filterable) && (
          <div className="flex flex-col gap-4 mb-6">
            {searchable && (
              <div className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}
            {filterable && (
              <div className="flex flex-wrap gap-2">
                {columns
                  .filter(col => col.filterable)
                  .map(column => (
                    <Select
                      key={column.key}
                      value={filters[column.key] || "all"}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, [column.key]: value || "all" }))
                      }
                    >
                      <SelectTrigger className="w-full sm:w-40 min-w-[120px]">
                        <SelectValue placeholder={column.label} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All {column.label}</SelectItem>
                        {Array.from(new Set(data.map(row => row[column.key])))
                          .filter(value => value !== null && value !== undefined && String(value).trim() !== "")
                          .map(value => (
                            <SelectItem key={String(value)} value={String(value)}>
                              {String(value)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Table - Desktop View */}
        <div className="hidden md:block rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn(
                        "px-4 py-3 text-left text-sm font-medium",
                        column.sortable && "cursor-pointer hover:bg-muted/70",
                        column.align === 'center' && "text-center",
                        column.align === 'right' && "text-right"
                      )}
                      style={{ width: column.width }}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center gap-2">
                        {column.label}
                        {column.sortable && getSortIcon(column.key)}
                      </div>
                    </th>
                  ))}
                  {(editable || deletable) && (
                    <th className="px-4 py-3 text-right text-sm font-medium w-12">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "border-b hover:bg-muted/50 transition-colors",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "px-4 py-3 text-sm",
                          column.align === 'center' && "text-center",
                          column.align === 'right' && "text-right"
                        )}
                      >
                        {renderCell(column, row)}
                      </td>
                    ))}
                    {(editable || deletable) && (
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onRowClick?.(row)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {editable && (
                              <DropdownMenuItem onClick={() => openEditDialog(row)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            )}
                            {deletable && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(row.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-4">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className={cn(
                "border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors",
                onRowClick && "cursor-pointer"
              )}
              onClick={() => onRowClick?.(row)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  {columns.slice(0, 3).map((column) => (
                    <div key={column.key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {column.label}:
                      </span>
                      <div className="text-sm text-right max-w-[60%]">
                        {renderCell(column, row)}
                      </div>
                    </div>
                  ))}
                </div>
                {(editable || deletable) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-2">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onRowClick?.(row)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {editable && (
                        <DropdownMenuItem onClick={() => openEditDialog(row)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {deletable && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              {/* Show additional columns in a collapsible way */}
              {columns.length > 3 && (
                <div className="pt-2 border-t space-y-2">
                  {columns.slice(3).map((column) => (
                    <div key={column.key} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        {column.label}:
                      </span>
                      <div className="text-sm text-right max-w-[60%]">
                        {renderCell(column, row)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {paginatedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No data found</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hidden sm:flex"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="sm:hidden"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0 text-xs"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 3 && (
                  <>
                    <span className="text-muted-foreground text-xs">...</span>
                    <Button
                      variant={currentPage === totalPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-8 h-8 p-0 text-xs"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hidden sm:flex"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="sm:hidden"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Record</DialogTitle>
              <DialogDescription>
                Update the record details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {columns
                .filter(col => col.editable !== false && col.type !== 'action')
                .map(column => (
                  <div key={column.key} className="space-y-2">
                    <Label htmlFor={column.key}>{column.label}</Label>
                    {renderInput(column, editRowData[column.key] || '', (value) => 
                      setEditRowData(prev => ({ ...prev, [column.key]: value }))
                    )}
                  </div>
                ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit}>
                Update Record
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
