import { useState } from "react";
import { AdvancedDataTable, TableColumn, TableData } from "./AdvancedDataTable";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Simple example data
const sampleData: TableData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    department: "Engineering"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Developer",
    status: "Active",
    department: "Engineering"
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com", 
    role: "Manager",
    status: "Inactive",
    department: "Marketing"
  }
];

// Simple column configuration
const columns: TableColumn[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    filterable: true,
    editable: true,
    inputType: "text"
  },
  {
    key: "email", 
    label: "Email",
    sortable: true,
    filterable: true,
    editable: true,
    inputType: "email"
  },
  {
    key: "role",
    label: "Role", 
    sortable: true,
    filterable: true,
    editable: true,
    inputType: "select",
    options: [
      { value: "Admin", label: "Admin" },
      { value: "Developer", label: "Developer" },
      { value: "Manager", label: "Manager" }
    ],
    type: "badge"
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    filterable: true,
    editable: true,
    inputType: "select", 
    options: [
      { value: "Active", label: "Active" },
      { value: "Inactive", label: "Inactive" }
    ],
    render: (value) => (
      <Badge 
        variant="outline" 
        className={value === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
      >
        {value}
      </Badge>
    )
  },
  {
    key: "department",
    label: "Department",
    sortable: true,
    filterable: true,
    editable: true,
    inputType: "select",
    options: [
      { value: "Engineering", label: "Engineering" },
      { value: "Marketing", label: "Marketing" },
      { value: "Sales", label: "Sales" }
    ]
  }
];

export const TableExample = () => {
  const [data, setData] = useState<TableData[]>(sampleData);

  const handleAdd = (newData: Partial<TableData>) => {
    const newRecord: TableData = {
      id: Date.now().toString(),
      name: newData.name || "",
      email: newData.email || "",
      role: newData.role || "Developer",
      status: newData.status || "Active",
      department: newData.department || "Engineering"
    };
    setData(prev => [newRecord, ...prev]);
  };

  const handleEdit = (id: string, updatedData: Partial<TableData>) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleExport = () => {
    toast.success("Data exported successfully!");
  };

  return (
    <AdvancedDataTable
      title="Simple Table Example"
      description="A basic example of the AdvancedDataTable component"
      columns={columns}
      data={data}
      searchable={true}
      filterable={true}
      exportable={true}
      addable={true}
      editable={true}
      deletable={true}
      pagination={true}
      pageSize={5}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onExport={handleExport}
    />
  );
};
