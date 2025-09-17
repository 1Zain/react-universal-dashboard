import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Filter, 
  Calendar,
  Users,
  Activity,
  Zap,
  Clock
} from "lucide-react";
import { chartData, dashboardStats } from "@/data/mockData";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { cn } from "@/lib/utils";

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("all");

  const periods = [
    { value: "1d", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];

  const metrics = [
    { value: "all", label: "All Metrics" },
    { value: "users", label: "User Activity" },
    { value: "performance", label: "System Performance" },
    { value: "errors", label: "Error Rates" },
    { value: "revenue", label: "Revenue" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive analytics and insights for your system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
        </div>
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
              <label className="text-sm font-medium mb-2 block">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Metric Type</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input placeholder="Search metrics..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.slice(0, 4).map((stat) => (
          <Card key={stat.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  {stat.trend && (
                    <div className="flex items-center mt-1">
                      {stat.trend.isPositive ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={cn(
                        "text-sm",
                        stat.trend.isPositive ? "text-green-500" : "text-red-500"
                      )}>
                        {stat.trend.value}%
                      </span>
                    </div>
                  )}
                </div>
                <div className={cn("p-3 rounded-full", stat.color.replace("text-", "bg-").replace("-500", "-100"))}>
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData.map((chart) => (
          <ChartCard
            key={chart.id}
            title={chart.title}
            description={chart.description}
            data={chart.data}
            type={chart.type}
            onRefresh={() => {}}
            onExport={() => {}}
          />
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>System performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Response Time", value: "120ms", trend: -5, status: "good" },
                { name: "Throughput", value: "1,250 req/s", trend: 12, status: "good" },
                { name: "Error Rate", value: "0.2%", trend: -0.1, status: "good" },
                { name: "CPU Usage", value: "45%", trend: 8, status: "warning" },
                { name: "Memory Usage", value: "68%", trend: 15, status: "warning" },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      metric.status === "good" && "bg-green-500",
                      metric.status === "warning" && "bg-yellow-500",
                      metric.status === "critical" && "bg-red-500"
                    )} />
                    <div>
                      <p className="font-medium">{metric.name}</p>
                      <p className="text-sm text-muted-foreground">Current: {metric.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {metric.trend > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      metric.trend > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {Math.abs(metric.trend)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>At-a-glance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Active Users</span>
                </div>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Sessions Today</span>
                </div>
                <span className="font-semibold">5,678</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">API Calls</span>
                </div>
                <span className="font-semibold">12,345</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Avg. Session</span>
                </div>
                <span className="font-semibold">8m 32s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Conversion Funnel"
          description="User journey through the platform"
          data={[
            { name: "Visitors", value: 10000 },
            { name: "Signups", value: 2500 },
            { name: "Trial Users", value: 1200 },
            { name: "Paid Users", value: 800 },
            { name: "Active Users", value: 600 },
          ]}
          type="bar"
          onRefresh={() => {}}
          onExport={() => {}}
        />
        
        <ChartCard
          title="Feature Usage"
          description="Most used features this month"
          data={[
            { name: "Dashboard", value: 85, color: "#3b82f6" },
            { name: "Analytics", value: 72, color: "#8b5cf6" },
            { name: "Reports", value: 58, color: "#06b6d4" },
            { name: "Settings", value: 45, color: "#10b981" },
            { name: "Profile", value: 38, color: "#f59e0b" },
          ]}
          type="pie"
          onRefresh={() => {}}
          onExport={() => {}}
        />
        
        <ChartCard
          title="Response Time Trends"
          description="API response times over the last 24 hours"
          data={[
            { name: "00:00", value: 120 },
            { name: "04:00", value: 95 },
            { name: "08:00", value: 180 },
            { name: "12:00", value: 220 },
            { name: "16:00", value: 195 },
            { name: "20:00", value: 150 },
            { name: "24:00", value: 110 },
          ]}
          type="line"
          onRefresh={() => {}}
          onExport={() => {}}
        />
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Real-time Traffic"
          description="Live user activity and page views"
          data={[
            { name: "Current Users", value: 1247, change: 12 },
            { name: "Page Views/min", value: 3456, change: 8 },
            { name: "API Calls/min", value: 8923, change: 15 },
            { name: "Error Rate", value: 0.3, change: -0.1 },
          ]}
          type="bar"
          onRefresh={() => {}}
          onExport={() => {}}
        />
        
        <ChartCard
          title="Server Health"
          description="Current server status and performance"
          data={[
            { name: "Server 1", value: 95, status: "healthy" },
            { name: "Server 2", value: 88, status: "healthy" },
            { name: "Server 3", value: 92, status: "healthy" },
            { name: "Server 4", value: 76, status: "warning" },
            { name: "Server 5", value: 98, status: "healthy" },
          ]}
          type="bar"
          onRefresh={() => {}}
          onExport={() => {}}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;
