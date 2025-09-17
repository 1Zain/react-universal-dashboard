import { useState } from "react";
import { ChevronDown, Search, User, LogOut, Bell, Settings } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import NotificationsPopover from "./NotificationsPopover";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to a search results page or implement search functionality
    }
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 shadow-sm">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold text-primary hidden sm:block">Universal Dashboard</h1>
        <h1 className="text-xl font-bold text-primary block sm:hidden">Dashboard</h1>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <form onSubmit={handleSearch} className="w-full relative">
          <Input
            type="search"
            placeholder="Search... (Ctrl+K)"
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <IconButton
          icon={<Search className="h-5 w-5" />}
          className="md:hidden"
          aria-label="Search"
          onClick={() => {
            // Implement mobile search functionality
          }}
        />
        <IconButton
          icon={<Bell className="h-5 w-5" />}
          aria-label="Notifications"
          onClick={() => navigate('/notifications')}
        />
        <IconButton
          icon={<Settings className="h-5 w-5" />}
          aria-label="Settings"
          onClick={() => navigate('/settings')}
        />
        <NotificationsPopover
          onClick={() => navigate('/notifications')}
        />
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center space-x-2 outline-none">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">{user?.name || 'User'}</span>
              <span className="text-xs text-muted-foreground">{user?.title || 'Administrator'}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}