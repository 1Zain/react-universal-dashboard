import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Activity, 
  User, 
  Settings, 
  Database, 
  Shield, 
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'system' | 'security' | 'notification';
  category: string;
  metadata?: Record<string, any>;
}

interface ActivityFeedProps {
  title?: string;
  description?: string;
  activities: ActivityItem[];
  maxItems?: number;
  showUserAvatars?: boolean;
  showTimestamps?: boolean;
  showCategories?: boolean;
  onViewAll?: () => void;
  onActivityClick?: (activity: ActivityItem) => void;
  className?: string;
}

export const ActivityFeed = ({
  title = "Recent Activities",
  description = "Latest system activities and user actions",
  activities,
  maxItems = 10,
  showUserAvatars = true,
  showTimestamps = true,
  showCategories = true,
  onViewAll,
  onActivityClick,
  className
}: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'create': return <CheckCircle className="h-4 w-4" />;
      case 'update': return <Settings className="h-4 w-4" />;
      case 'delete': return <XCircle className="h-4 w-4" />;
      case 'login': return <User className="h-4 w-4" />;
      case 'logout': return <User className="h-4 w-4" />;
      case 'system': return <Database className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'notification': return <Bell className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'create': return "bg-green-100 text-green-600";
      case 'update': return "bg-blue-100 text-blue-600";
      case 'delete': return "bg-red-100 text-red-600";
      case 'login': return "bg-green-100 text-green-600";
      case 'logout': return "bg-gray-100 text-gray-600";
      case 'system': return "bg-purple-100 text-purple-600";
      case 'security': return "bg-orange-100 text-orange-600";
      case 'notification': return "bg-yellow-100 text-yellow-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-green-100 text-green-700 border-green-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-orange-100 text-orange-700 border-orange-200",
      "bg-pink-100 text-pink-700 border-pink-200",
      "bg-cyan-100 text-cyan-700 border-cyan-200",
    ];
    
    // Simple hash function to get consistent color for category
    const hash = category.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const getUserInitials = (user: ActivityItem['user']) => {
    if (user.initials) return user.initials;
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {onViewAll && (
          <Button variant="outline" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.length === 0 ? (
            <div className="text-center py-6">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No activities found</p>
            </div>
          ) : (
            displayedActivities.map((activity) => (
              <div 
                key={activity.id} 
                className={cn(
                  "flex items-start space-x-4 p-3 rounded-lg transition-colors",
                  onActivityClick && "cursor-pointer hover:bg-muted/50"
                )}
                onClick={() => onActivityClick?.(activity)}
              >
                {/* User Avatar */}
                {showUserAvatars && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback className="text-xs">
                      {getUserInitials(activity.user)}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Activity Icon */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  getActivityColor(activity.type)
                )}>
                  {getActivityIcon(activity.type)}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    {showCategories && (
                      <Badge variant="outline" className={cn("text-xs", getCategoryColor(activity.category))}>
                        {activity.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{activity.user.name}</span>
                    {showTimestamps && (
                      <>
                        <span>•</span>
                        <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                      </>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(activity.metadata).slice(0, 3).map(([key, value]) => (
                        <Badge key={key} variant="secondary" className="text-xs">
                          {key}: {String(value)}
                        </Badge>
                      ))}
                      {Object.keys(activity.metadata).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{Object.keys(activity.metadata).length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage with sample data
export const ActivityFeedExample = () => {
  const sampleActivities: ActivityItem[] = [
    {
      id: "1",
      title: "User Login",
      description: "John Doe logged into the system",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      user: { name: "John Doe", initials: "JD" },
      type: "login",
      category: "Authentication",
      metadata: { ip: "192.168.1.100", userAgent: "Chrome/91.0" }
    },
    {
      id: "2",
      title: "Data Export",
      description: "User data exported successfully",
      timestamp: new Date(Date.now() - 600000).toISOString(),
      user: { name: "Jane Smith", initials: "JS" },
      type: "create",
      category: "Data Management",
      metadata: { format: "CSV", records: 150 }
    },
    {
      id: "3",
      title: "Settings Updated",
      description: "System settings have been modified",
      timestamp: new Date(Date.now() - 900000).toISOString(),
      user: { name: "Admin User", initials: "AU" },
      type: "update",
      category: "Configuration",
      metadata: { setting: "theme", value: "dark" }
    },
  ];

  return (
    <ActivityFeed
      activities={sampleActivities}
      onViewAll={() => {}}
      onActivityClick={(activity) => {}}
    />
  );
};
