import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search,
  Plus,
  Eye,
  Trash2,
  RefreshCw,
  BarChart3,
  TrendingUp,
  Users,
  Activity
} from "lucide-react";
import { reports } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const ReportsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const reportTypes = [
    { value: "all", label: "All Types" },
    { value: "activity", label: "Activity Reports" },
    { value: "performance", label: "Performance Reports" },
    { value: "user", label: "User Reports" },
    { value: "system", label: "System Reports" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "completed", label: "Completed" },
    { value: "generating", label: "Generating" },
    { value: "failed", label: "Failed" },
  ];

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "generating": return "bg-blue-100 text-blue-700 border-blue-200";
      case "failed": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "activity": return <Activity className="h-4 w-4" />;
      case "performance": return <BarChart3 className="h-4 w-4" />;
      case "user": return <Users className="h-4 w-4" />;
      case "system": return <TrendingUp className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "pdf": return "bg-red-100 text-red-700 border-red-200";
      case "excel": return "bg-green-100 text-green-700 border-green-200";
      case "csv": return "bg-blue-100 text-blue-700 border-blue-200";
      case "json": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and manage system reports and analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === "completed").length}</p>
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
                <p className="text-sm font-medium text-muted-foreground">Generating</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === "generating").length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === "failed").length}</p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Reports ({filteredReports.length})</CardTitle>
          <CardDescription>View and manage all generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-muted rounded-lg">
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{report.title}</h3>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{report.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Generated by: {report.generatedBy.name}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(report.generatedAt), { addSuffix: true })}</span>
                      <span>•</span>
                      <Badge variant="outline" className={getFormatColor(report.format)}>
                        {report.format.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "completed" && report.downloadUrl && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
          <CardDescription>Generate common reports with one click</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                title: "User Activity Report", 
                description: "Daily user activity summary",
                icon: <Users className="h-6 w-6" />,
                color: "bg-blue-100 text-blue-700 hover:bg-blue-200"
              },
              { 
                title: "System Performance", 
                description: "System metrics and performance",
                icon: <BarChart3 className="h-6 w-6" />,
                color: "bg-green-100 text-green-700 hover:bg-green-200"
              },
              { 
                title: "Error Log Report", 
                description: "System errors and warnings",
                icon: <Activity className="h-6 w-6" />,
                color: "bg-red-100 text-red-700 hover:bg-red-200"
              },
              { 
                title: "Usage Statistics", 
                description: "Application usage analytics",
                icon: <TrendingUp className="h-6 w-6" />,
                color: "bg-purple-100 text-purple-700 hover:bg-purple-200"
              },
            ].map((action, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-lg border cursor-pointer hover:shadow-sm transition-all",
                  "hover:-translate-y-1",
                  action.color
                )}
              >
                <div className="mb-2">
                  {action.icon}
                </div>
                <h3 className="text-sm font-medium text-center mb-1">{action.title}</h3>
                <p className="text-xs text-center opacity-75">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
