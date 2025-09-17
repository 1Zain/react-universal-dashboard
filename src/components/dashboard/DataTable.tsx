import { useState } from "react";
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
  ChevronsUpDown
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

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'action';
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableData {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  title: string;
  description?: string;
  columns: TableColumn[];
  data: TableData[];
  searchable?: boolean;
  filterable?: boolean;
  exportable?: boolean;
  onRowClick?: (row: TableData) => void;
  onAction?: (action: string, row: TableData) => void;
  className?: string;
}

export const DataTable = ({
  title,
  description,
  columns,
  data,
  searchable = true,
  filterable = true,
  exportable = true,
  onRowClick,
  onAction,
  className
}: DataTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Filter data based on search and filters
  const filteredData = data.filter(row => {
    const matchesSearch = !searchQuery || 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilters = Object.entries(filters).every(([key, value]) => 
      !value || value === "all" || String(row[key]).toLowerCase().includes(value.toLowerCase())
    );
    
    return matchesSearch && matchesFilters;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

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

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {exportable && (
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        {(searchable || filterable) && (
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {searchable && (
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            )}
            {filterable && (
              <div className="flex gap-2">
                {columns
                  .filter(col => col.filterable)
                  .map(column => (
                    <Select
                      key={column.key}
                      value={filters[column.key] || "all"}
                      onValueChange={(value) => 
                        setFilters(prev => ({ ...prev, [column.key]: value }))
                      }
                    >
                      <SelectTrigger className="w-40">
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

        {/* Table */}
        <div className="rounded-md border">
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
                  {onAction && (
                    <th className="px-4 py-3 text-right text-sm font-medium w-12">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row) => (
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
                    {onAction && (
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onAction('view', row)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onAction('edit', row)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => onAction('delete', row)}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
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

        {/* Empty State */}
        {sortedData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No data found</p>
          </div>
        )}

        {/* Pagination Info */}
        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>
            Showing {sortedData.length} of {data.length} entries
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
