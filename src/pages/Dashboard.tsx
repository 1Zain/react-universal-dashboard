import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  BarChart3, 
  Users, 
  Settings, 
  TrendingUp, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  HardDrive,
  Heart,
  User
} from "lucide-react";
import { dashboardStats, activities, notifications, chartData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ReactNode> = {
  "users": <Users className="h-5 w-5" />,
  "activity": <Activity className="h-5 w-5" />,
  "heart": <Heart className="h-5 w-5" />,
  "hard-drive": <HardDrive className="h-5 w-5" />,
  "zap": <Zap className="h-5 w-5" />,
  "alert-triangle": <AlertTriangle className="h-5 w-5" />,
  "bar-chart": <BarChart3 className="h-5 w-5" />,
  "settings": <Settings className="h-5 w-5" />,
  "trending-up": <TrendingUp className="h-5 w-5" />,
  "clock": <Clock className="h-5 w-5" />,
  "check-circle": <CheckCircle className="h-5 w-5" />,
  "user": <User className="h-5 w-5" />,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Get recent activities
  const recentActivities = [...activities].slice(0, 5);
  
  // Get unread notifications
  const unreadNotifications = notifications.filter(n => !n.isRead);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardStats.map((stat) => (
          <DashboardCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            icon={iconMap[stat.icon]}
            colorClass={stat.color}
            onClick={() => {
              // Navigate based on stat type
              if (stat.title === "Total Users") {
                navigate('/users');
              } else if (stat.title === "System Health") {
                navigate('/system');
              } else if (stat.title === "API Requests") {
                navigate('/analytics');
              }
            }}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities and user actions</CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate('/activities')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    activity.type === "login" && "bg-green-100 text-green-600",
                    activity.type === "create" && "bg-blue-100 text-blue-600",
                    activity.type === "update" && "bg-yellow-100 text-yellow-600",
                    activity.type === "delete" && "bg-red-100 text-red-600",
                    activity.type === "system" && "bg-purple-100 text-purple-600"
                  )}>
                    {iconMap[activity.type] || <Activity className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.user.name}</span>
                      <span>•</span>
                      <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>System alerts and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadNotifications.length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                </div>
              ) : (
                unreadNotifications.slice(0, 4).map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2",
                      notification.type === "info" && "bg-blue-500",
                      notification.type === "success" && "bg-green-500",
                      notification.type === "warning" && "bg-yellow-500",
                      notification.type === "error" && "bg-red-500"
                    )} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            notification.priority === "high" && "border-red-200 text-red-700",
                            notification.priority === "medium" && "border-yellow-200 text-yellow-700",
                            notification.priority === "low" && "border-green-200 text-green-700"
                          )}
                        >
                          {notification.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                title: "View Analytics", 
                icon: <BarChart3 className="h-6 w-6" />, 
                color: "bg-blue-100 text-blue-700 hover:bg-blue-200", 
                path: "/analytics" 
              },
              { 
                title: "Manage Users", 
                icon: <Users className="h-6 w-6" />, 
                color: "bg-green-100 text-green-700 hover:bg-green-200", 
                path: "/users" 
              },
              { 
                title: "System Settings", 
                icon: <Settings className="h-6 w-6" />, 
                color: "bg-purple-100 text-purple-700 hover:bg-purple-200", 
                path: "/settings" 
              },
              { 
                title: "View Reports", 
                icon: <TrendingUp className="h-6 w-6" />, 
                color: "bg-orange-100 text-orange-700 hover:bg-orange-200", 
                path: "/reports" 
              },
            ].map((action, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-lg border cursor-pointer hover:shadow-sm transition-all",
                  "hover:-translate-y-1",
                  action.color
                )}
                onClick={() => navigate(action.path)}
              >
                <div className="mb-2">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-center">{action.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Chart component will be rendered here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Server", status: "operational", uptime: "99.9%" },
                { name: "Database", status: "operational", uptime: "99.8%" },
                { name: "File Storage", status: "operational", uptime: "99.7%" },
                { name: "Email Service", status: "degraded", uptime: "95.2%" },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                  </div>
                  <Badge 
                    variant={service.status === "operational" ? "default" : "destructive"}
                    className={cn(
                      service.status === "operational" && "bg-green-100 text-green-700",
                      service.status === "degraded" && "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;