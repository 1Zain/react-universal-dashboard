import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Monitor, 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Upload,
  Activity
} from "lucide-react";
import { systemHealth } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const SystemPage = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "up": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "down": return <XCircle className="h-4 w-4 text-red-500" />;
      case "degraded": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up": return "bg-green-100 text-green-700 border-green-200";
      case "down": return "bg-red-100 text-red-700 border-red-200";
      case "degraded": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "critical": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Monitor</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system health, performance, and services
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <p className={cn("text-2xl font-bold capitalize", getHealthColor(systemHealth.status))}>
                  {systemHealth.status}
                </p>
              </div>
              <Monitor className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">{systemHealth.uptime}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Services</p>
                <p className="text-2xl font-bold">
                  {systemHealth.services.filter(s => s.status === "up").length}/{systemHealth.services.length}
                </p>
              </div>
              <Server className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-sm font-bold">
                  {formatDistanceToNow(new Date(systemHealth.lastUpdated), { addSuffix: true })}
                </p>
              </div>
              <RefreshCw className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Current system resource consumption</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">CPU Usage</span>
                </div>
                <span className="text-sm font-bold">{systemHealth.metrics.cpu}%</span>
              </div>
              <Progress value={systemHealth.metrics.cpu} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MemoryStick className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <span className="text-sm font-bold">{systemHealth.metrics.memory}%</span>
              </div>
              <Progress value={systemHealth.metrics.memory} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Disk Usage</span>
                </div>
                <span className="text-sm font-bold">{systemHealth.metrics.disk}%</span>
              </div>
              <Progress value={systemHealth.metrics.disk} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Network Usage</span>
                </div>
                <span className="text-sm font-bold">{systemHealth.metrics.network}%</span>
              </div>
              <Progress value={systemHealth.metrics.network} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>Status of all system services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last check: {formatDistanceToNow(new Date(service.lastCheck), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {service.responseTime && (
                      <span className="text-sm text-muted-foreground">
                        {service.responseTime}ms
                      </span>
                    )}
                    <Badge variant="outline" className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>Basic system details and specifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Operating System</span>
                <span className="text-sm text-muted-foreground">Ubuntu 22.04 LTS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Kernel Version</span>
                <span className="text-sm text-muted-foreground">5.15.0-91-generic</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Architecture</span>
                <span className="text-sm text-muted-foreground">x86_64</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Memory</span>
                <span className="text-sm text-muted-foreground">16 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Storage</span>
                <span className="text-sm text-muted-foreground">500 GB SSD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">CPU Cores</span>
                <span className="text-sm text-muted-foreground">8 cores</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Information</CardTitle>
            <CardDescription>Application version and build details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Application Version</span>
                <span className="text-sm text-muted-foreground">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Build Date</span>
                <span className="text-sm text-muted-foreground">2024-01-15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Node.js Version</span>
                <span className="text-sm text-muted-foreground">v18.17.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Database Version</span>
                <span className="text-sm text-muted-foreground">PostgreSQL 14.9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Environment</span>
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Production
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Logs</CardTitle>
          <CardDescription>Latest system events and logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { level: "INFO", message: "System health check completed successfully", time: "2 minutes ago" },
              { level: "WARN", message: "High memory usage detected on database server", time: "5 minutes ago" },
              { level: "INFO", message: "User authentication successful for admin@example.com", time: "8 minutes ago" },
              { level: "ERROR", message: "Failed to connect to external API service", time: "12 minutes ago" },
              { level: "INFO", message: "Scheduled backup completed successfully", time: "1 hour ago" },
            ].map((log, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    log.level === "ERROR" && "bg-red-100 text-red-700 border-red-200",
                    log.level === "WARN" && "bg-yellow-100 text-yellow-700 border-yellow-200",
                    log.level === "INFO" && "bg-blue-100 text-blue-700 border-blue-200"
                  )}
                >
                  {log.level}
                </Badge>
                <span className="text-sm flex-1">{log.message}</span>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemPage;
