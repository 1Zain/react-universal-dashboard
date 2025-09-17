import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Bell, 
  Palette,
  Database,
  Globe,
  Mail,
  Key,
  Users,
  Monitor
} from "lucide-react";
import { settings } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  
  // General Settings State
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  
  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [passwordComplexity, setPasswordComplexity] = useState(true);
  const [apiRateLimiting, setApiRateLimiting] = useState(true);
  
  // Notification Settings State
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [userActivity, setUserActivity] = useState(false);
  const [securityEvents, setSecurityEvents] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  
  // Appearance Settings State
  const [compactMode, setCompactMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "integrations", label: "Integrations", icon: Globe },
    { id: "backup", label: "Backup", icon: Database },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    toast.success("Settings saved successfully");
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Basic application configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input id="siteName" defaultValue="Universal Dashboard" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input id="siteUrl" defaultValue="https://dashboard.example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Enter application description..."
              defaultValue="A comprehensive dashboard for managing your system"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select defaultValue="UTC">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time</SelectItem>
                  <SelectItem value="PST">Pacific Time</SelectItem>
                  <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>System-wide configuration options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable maintenance mode to restrict access
              </p>
            </div>
            <Switch 
              checked={maintenanceMode}
              onCheckedChange={setMaintenanceMode}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Updates</Label>
              <p className="text-sm text-muted-foreground">
                Automatically install system updates
              </p>
            </div>
            <Switch 
              checked={autoUpdates}
              onCheckedChange={setAutoUpdates}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable debug logging and verbose output
              </p>
            </div>
            <Switch 
              checked={debugMode}
              onCheckedChange={setDebugMode}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>Configure user authentication settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require 2FA for all users
              </p>
            </div>
            <Switch 
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Password Complexity</Label>
              <p className="text-sm text-muted-foreground">
                Enforce strong password requirements
              </p>
            </div>
            <Switch 
              checked={passwordComplexity}
              onCheckedChange={setPasswordComplexity}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input id="sessionTimeout" type="number" defaultValue="30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
            <Input id="maxLoginAttempts" type="number" defaultValue="5" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Security</CardTitle>
          <CardDescription>Configure API access and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>API Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Limit API requests per user
              </p>
            </div>
            <Switch 
              checked={apiRateLimiting}
              onCheckedChange={setApiRateLimiting}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2">
              <Input id="apiKey" type="password" defaultValue="sk-1234567890abcdef" readOnly />
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Configure email notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive system alerts via email
              </p>
            </div>
            <Switch 
              checked={systemAlerts}
              onCheckedChange={setSystemAlerts}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>User Activity</Label>
              <p className="text-sm text-muted-foreground">
                Get notified of important user activities
              </p>
            </div>
            <Switch 
              checked={userActivity}
              onCheckedChange={setUserActivity}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Events</Label>
              <p className="text-sm text-muted-foreground">
                Receive security-related notifications
              </p>
            </div>
            <Switch 
              checked={securityEvents}
              onCheckedChange={setSecurityEvents}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>In-App Notifications</CardTitle>
          <CardDescription>Configure in-application notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Show desktop notifications
              </p>
            </div>
            <Switch 
              checked={desktopNotifications}
              onCheckedChange={setDesktopNotifications}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sound Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Play sound for notifications
              </p>
            </div>
            <Switch 
              checked={soundNotifications}
              onCheckedChange={setSoundNotifications}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>Customize the application appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select defaultValue="light">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex gap-2">
              {['blue', 'green', 'purple', 'red', 'orange'].map((color) => (
                <div
                  key={color}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 cursor-pointer",
                    color === 'blue' && "bg-blue-500 border-blue-600",
                    color === 'green' && "bg-green-500 border-green-600",
                    color === 'purple' && "bg-purple-500 border-purple-600",
                    color === 'red' && "bg-red-500 border-red-600",
                    color === 'orange' && "bg-orange-500 border-orange-600"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout Settings</CardTitle>
          <CardDescription>Configure the application layout</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Compact Mode</Label>
              <p className="text-sm text-muted-foreground">
                Use compact spacing throughout the interface
              </p>
            </div>
            <Switch 
              checked={compactMode}
              onCheckedChange={setCompactMode}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sidebar Collapsed</Label>
              <p className="text-sm text-muted-foreground">
                Start with sidebar collapsed by default
              </p>
            </div>
            <Switch 
              checked={sidebarCollapsed}
              onCheckedChange={setSidebarCollapsed}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general": return renderGeneralSettings();
      case "security": return renderSecuritySettings();
      case "notifications": return renderNotificationSettings();
      case "appearance": return renderAppearanceSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Configure your application settings and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <nav className="space-y-1 p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
