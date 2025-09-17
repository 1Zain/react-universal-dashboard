import { useState } from "react";
import { AdvancedDataTable, TableColumn, TableData } from "@/components/dashboard/AdvancedDataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  Star,
  Download
} from "lucide-react";
import { toast } from "sonner";

// Sample data for the demo
const generateSampleData = (): TableData[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
  const roles = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst', 'Support'];
  
  return Array.from({ length: 50 }, (_, index) => ({
    id: `user-${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@company.com`,
    phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    role: roles[Math.floor(Math.random() * roles.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    salary: Math.floor(Math.random() * 100000) + 50000,
    joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
    location: ['New York', 'San Francisco', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 5)],
    rating: Math.floor(Math.random() * 5) + 1,
    isActive: Math.random() > 0.3,
  }));
};

const TableDemoPage = () => {
  const [data, setData] = useState<TableData[]>(generateSampleData());

  // Define table columns with full functionality
  const columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'text',
      render: (value, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'email'
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'text',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'select',
      options: [
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Sales', label: 'Sales' },
        { value: 'HR', label: 'HR' },
        { value: 'Finance', label: 'Finance' },
        { value: 'Operations', label: 'Operations' }
      ],
      render: (value) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'select',
      options: [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Designer', label: 'Designer' },
        { value: 'Analyst', label: 'Analyst' },
        { value: 'Support', label: 'Support' }
      ],
      type: 'badge'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Suspended', label: 'Suspended' }
      ],
      render: (value) => (
        <Badge 
          variant="outline" 
          className={
            value === 'Active' ? 'bg-green-100 text-green-700 border-green-200' :
            value === 'Inactive' ? 'bg-gray-100 text-gray-700 border-gray-200' :
            value === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
            'bg-red-100 text-red-700 border-red-200'
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'number',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'text',
      type: 'date',
      render: (value) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'select',
      options: [
        { value: 'New York', label: 'New York' },
        { value: 'San Francisco', label: 'San Francisco' },
        { value: 'London', label: 'London' },
        { value: 'Tokyo', label: 'Tokyo' },
        { value: 'Berlin', label: 'Berlin' }
      ],
      render: (value) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'number',
      render: (value) => (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < value ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">({value})</span>
        </div>
      )
    },
    {
      key: 'isActive',
      label: 'Active',
      sortable: true,
      filterable: true,
      editable: true,
      inputType: 'select',
      options: [
        { value: 'true', label: 'Yes' },
        { value: 'false', label: 'No' }
      ],
      type: 'boolean',
      render: (value) => (
        <Badge variant="outline" className={value ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}>
          {value ? 'Yes' : 'No'}
        </Badge>
      )
    }
  ];

  // Event handlers
  const handleAdd = (newData: Partial<TableData>) => {
    const newRecord: TableData = {
      id: `user-${Date.now()}`,
      name: newData.name || '',
      email: newData.email || '',
      phone: newData.phone || '',
      department: newData.department || 'Engineering',
      role: newData.role || 'Developer',
      status: newData.status || 'Active',
      salary: Number(newData.salary) || 50000,
      joinDate: newData.joinDate || new Date().toISOString(),
      location: newData.location || 'New York',
      rating: Number(newData.rating) || 1,
      isActive: newData.isActive === 'true' || newData.isActive === true,
    };
    setData(prev => [newRecord, ...prev]);
  };

  const handleEdit = (id: string, updatedData: Partial<TableData>) => {
    setData(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            ...updatedData,
            salary: Number(updatedData.salary) || item.salary,
            rating: Number(updatedData.rating) || item.rating,
            isActive: updatedData.isActive === 'true' || updatedData.isActive === true || updatedData.isActive === false ? updatedData.isActive : item.isActive
          }
        : item
    ));
  };

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleExport = () => {
    // Simulate export functionality
    toast.success("Data exported successfully!");
  };

  const handleRowClick = (row: TableData) => {
    toast.info(`Clicked on ${row.name}`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Advanced Data Table Demo</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          A comprehensive table component with search, filter, add, edit, delete, and pagination functionality
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Records</p>
                <p className="text-2xl font-bold">{data.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{data.filter(d => d.isActive).length}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{new Set(data.map(d => d.department)).size}</p>
              </div>
              <Building className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(data.reduce((sum, d) => sum + d.rating, 0) / data.length).toFixed(1)}
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Data Table */}
      <AdvancedDataTable
        title="Employee Management"
        description="Manage your team members with full CRUD operations"
        columns={columns}
        data={data}
        searchable={true}
        filterable={true}
        exportable={true}
        addable={true}
        editable={true}
        deletable={true}
        pagination={true}
        pageSize={10}
        onRowClick={handleRowClick}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
      />

    </div>
  );
};

export default TableDemoPage;
