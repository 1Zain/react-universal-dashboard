import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Monitor,
  Bell,
  LogOut,
  User,
  Activity,
  Shield,
  Database,
  Globe,
  Palette,
  Table
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { notifications } from "@/data/mockData";

// Generic navigation items for Universal Dashboard
const navigationItems = [
  { title: "Dashboard", path: "/", icon: "home", badge: 0 },
  { title: "Analytics", path: "/analytics", icon: "bar-chart", badge: 0 },
  { title: "Users", path: "/users", icon: "users", badge: 0 },
  { title: "Table Demo", path: "/table-demo", icon: "table", badge: 0 },
  { title: "Settings", path: "/settings", icon: "settings", badge: 0 },
  { title: "Reports", path: "/reports", icon: "file-text", badge: 0 },
  { title: "System", path: "/system", icon: "monitor", badge: 0 },
  { title: "Notifications", path: "/notifications", icon: "bell", badge: notifications.filter(n => !n.isRead).length },
  { title: "Profile", path: "/profile", icon: "user", badge: 0 },
];

const iconMap: Record<string, React.ReactNode> = {
  "home": <Home className="h-5 w-5" />,
  "bar-chart": <BarChart3 className="h-5 w-5" />,
  "users": <Users className="h-5 w-5" />,
  "table": <Table className="h-5 w-5" />,
  "settings": <Settings className="h-5 w-5" />,
  "file-text": <FileText className="h-5 w-5" />,
  "monitor": <Monitor className="h-5 w-5" />,
  "bell": <Bell className="h-5 w-5" />,
  "user": <User className="h-5 w-5" />,
  "activity": <Activity className="h-5 w-5" />,
  "shield": <Shield className="h-5 w-5" />,
  "database": <Database className="h-5 w-5" />,
  "globe": <Globe className="h-5 w-5" />,
  "palette": <Palette className="h-5 w-5" />,
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    if (path === "/logout") {
      handleLogout();
    } else {
      navigate(path);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold">Universal Dashboard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* User Profile - only visible when not collapsed */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 bg-blue-900 text-white hover:bg-blue-800 transition-colors">
              <AvatarFallback className="bg-blue-900 text-white">{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user?.name || 'User'}</div>
              <div className="text-sm text-sidebar-accent-foreground">{user?.title || 'Administrator'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-hidden p-2">
        <ul className="space-y-0.5">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Button
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-4" : "px-3",
                  location.pathname === item.path
                    ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <span className="relative">
                  {iconMap[item.icon]}
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -end-1 h-4 min-w-[1rem] rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </span>
                {!collapsed && <span className="ms-3">{item.title}</span>}
                {!collapsed && item.badge > 0 && (
                  <Badge variant="outline" className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground">
                    {item.badge > 99 ? "99+" : item.badge}
                  </Badge>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50",
            collapsed ? "px-4" : "px-3"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ms-3">Logout</span>}
        </Button>
      </div>

      {/* Footer - only visible when not collapsed */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-center text-sidebar-accent-foreground">
            Universal Dashboard | Version 1.0.0
          </div>
        </div>
      )}
    </aside>
  );
}