import { 
  User, 
  DashboardStats, 
  Activity, 
  Notification, 
  ChartData, 
  TableData, 
  TableColumn,
  Filter,
  SearchResult,
  MenuItem,
  Settings,
  FileUpload,
  Report,
  AuditLog,
  SystemHealth
} from "../types";

// Current User
export const currentUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@company.com",
  title: "System Administrator",
  department: "IT Department",
  avatar: "/placeholder.svg",
  online: true,
  status: 'online',
  role: 'admin',
  permissions: ['read', 'write', 'delete', 'admin'],
  lastActive: new Date().toISOString(),
};

// Sample Users
export const users: User[] = [
  currentUser,
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    title: "Project Manager",
    department: "Product Management",
    avatar: "/placeholder.svg",
    online: true,
    status: 'online',
    role: 'manager',
    permissions: ['read', 'write'],
    lastActive: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    title: "Developer",
    department: "Engineering",
    avatar: "/placeholder.svg",
    online: false,
    status: 'offline',
    role: 'developer',
    permissions: ['read', 'write'],
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    title: "Designer",
    department: "Design",
    avatar: "/placeholder.svg",
    online: true,
    status: 'away',
    role: 'designer',
    permissions: ['read'],
    lastActive: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@company.com",
    title: "Analyst",
    department: "Analytics",
    avatar: "/placeholder.svg",
    online: true,
    status: 'busy',
    role: 'analyst',
    permissions: ['read', 'write'],
    lastActive: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
  },
];

// Dashboard Statistics
export const dashboardStats: DashboardStats[] = [
  {
    id: "1",
    title: "Total Users",
    value: users.length,
    icon: "users",
    color: "text-blue-500",
    trend: { value: 12, isPositive: true },
    description: "Active users in the system"
  },
  {
    id: "2",
    title: "Active Sessions",
    value: users.filter(u => u.online).length,
    icon: "activity",
    color: "text-green-500",
    trend: { value: 8, isPositive: true },
    description: "Currently online users"
  },
  {
    id: "3",
    title: "System Health",
    value: "98.5%",
    icon: "heart",
    color: "text-emerald-500",
    trend: { value: 2.1, isPositive: true },
    description: "System uptime and performance"
  },
  {
    id: "4",
    title: "Storage Used",
    value: "2.4 GB",
    icon: "hard-drive",
    color: "text-orange-500",
    trend: { value: 15, isPositive: false },
    description: "Total storage consumption"
  },
  {
    id: "5",
    title: "API Requests",
    value: "1,234",
    icon: "zap",
    color: "text-purple-500",
    trend: { value: 23, isPositive: true },
    description: "Requests in the last hour"
  },
  {
    id: "6",
    title: "Error Rate",
    value: "0.2%",
    icon: "alert-triangle",
    color: "text-red-500",
    trend: { value: 0.1, isPositive: true },
    description: "System error percentage"
  },
];

// Recent Activities
export const activities: Activity[] = [
  {
    id: "1",
    title: "User Login",
    description: "Jane Smith logged into the system",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    user: users[1],
    type: "login",
    category: "Authentication",
    metadata: { ip: "192.168.1.100", userAgent: "Chrome/91.0" }
  },
  {
    id: "2",
    title: "Data Export",
    description: "Mike Johnson exported user data",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    user: users[2],
    type: "create",
    category: "Data Management",
    metadata: { format: "CSV", records: 150 }
  },
  {
    id: "3",
    title: "Settings Updated",
    description: "Sarah Wilson updated system settings",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    user: users[3],
    type: "update",
    category: "Configuration",
    metadata: { setting: "theme", value: "dark" }
  },
  {
    id: "4",
    title: "Report Generated",
    description: "David Brown generated monthly report",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    user: users[4],
    type: "create",
    category: "Reporting",
    metadata: { reportType: "monthly", period: "2024-01" }
  },
  {
    id: "5",
    title: "User Created",
    description: "John Doe created new user account",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    user: currentUser,
    type: "create",
    category: "User Management",
    metadata: { newUser: "alice@company.com" }
  },
];

// Notifications
export const notifications: Notification[] = [
  {
    id: "1",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur tonight at 2:00 AM",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    type: "info",
    category: "System",
    priority: "medium",
    actionUrl: "/maintenance",
    link: "/maintenance"
  },
  {
    id: "2",
    title: "New User Registration",
    message: "Alice Johnson has registered for an account",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: false,
    type: "success",
    category: "User Management",
    priority: "low",
    actionUrl: "/users",
    link: "/users"
  },
  {
    id: "3",
    title: "High CPU Usage",
    message: "Server CPU usage is above 90%",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    isRead: true,
    type: "warning",
    category: "System",
    priority: "high",
    actionUrl: "/monitoring",
    link: "/monitoring"
  },
  {
    id: "4",
    title: "Backup Completed",
    message: "Daily backup has been completed successfully",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    isRead: true,
    type: "success",
    category: "System",
    priority: "low",
    link: "/backup"
  },
];

// Chart Data
export const chartData: ChartData[] = [
  {
    id: "1",
    title: "User Activity Over Time",
    type: "line",
    data: [
      { name: "Jan", value: 1200, users: 800, sessions: 2400 },
      { name: "Feb", value: 1350, users: 920, sessions: 2700 },
      { name: "Mar", value: 1580, users: 1100, sessions: 3160 },
      { name: "Apr", value: 1420, users: 980, sessions: 2840 },
      { name: "May", value: 1890, users: 1250, sessions: 3780 },
      { name: "Jun", value: 2100, users: 1400, sessions: 4200 },
      { name: "Jul", value: 1950, users: 1300, sessions: 3900 },
      { name: "Aug", value: 2200, users: 1450, sessions: 4400 },
    ],
    description: "Monthly user activity trends with detailed metrics"
  },
  {
    id: "2",
    title: "System Performance",
    type: "bar",
    data: [
      { name: "CPU", value: 75, max: 100, threshold: 80 },
      { name: "Memory", value: 60, max: 100, threshold: 85 },
      { name: "Disk", value: 45, max: 100, threshold: 90 },
      { name: "Network", value: 80, max: 100, threshold: 95 },
      { name: "Database", value: 55, max: 100, threshold: 75 },
      { name: "Cache", value: 35, max: 100, threshold: 80 },
    ],
    description: "Current system resource usage with thresholds"
  },
  {
    id: "3",
    title: "User Distribution",
    type: "pie",
    data: [
      { name: "Admins", value: 8, color: "#ef4444" },
      { name: "Managers", value: 25, color: "#f97316" },
      { name: "Developers", value: 45, color: "#eab308" },
      { name: "Users", value: 122, color: "#22c55e" },
    ],
    description: "User role distribution across the platform"
  },
  {
    id: "4",
    title: "Revenue Trends",
    type: "area",
    data: [
      { name: "Q1", value: 125000, growth: 12 },
      { name: "Q2", value: 145000, growth: 16 },
      { name: "Q3", value: 168000, growth: 16 },
      { name: "Q4", value: 195000, growth: 16 },
    ],
    description: "Quarterly revenue growth and trends"
  },
  {
    id: "5",
    title: "Error Rates by Service",
    type: "bar",
    data: [
      { name: "API Gateway", value: 0.2, threshold: 1.0 },
      { name: "User Service", value: 0.5, threshold: 1.0 },
      { name: "Payment Service", value: 0.1, threshold: 0.5 },
      { name: "Notification Service", value: 1.2, threshold: 2.0 },
      { name: "Analytics Service", value: 0.8, threshold: 1.5 },
    ],
    description: "Error rates across different services"
  },
  {
    id: "6",
    title: "Geographic Distribution",
    type: "donut",
    data: [
      { name: "North America", value: 45, color: "#3b82f6" },
      { name: "Europe", value: 30, color: "#8b5cf6" },
      { name: "Asia", value: 20, color: "#06b6d4" },
      { name: "Others", value: 5, color: "#64748b" },
    ],
    description: "User distribution by geographic region"
  },
];

// Table Data and Columns
export const tableColumns: TableColumn[] = [
  { key: "id", label: "ID", sortable: true, width: "80px" },
  { key: "name", label: "Name", sortable: true, filterable: true },
  { key: "email", label: "Email", sortable: true, filterable: true },
  { key: "department", label: "Department", sortable: true, filterable: true },
  { key: "status", label: "Status", sortable: true, filterable: true },
  { key: "lastActive", label: "Last Active", sortable: true, type: "date" },
  { key: "actions", label: "Actions", type: "action", width: "120px" },
];

export const tableData: TableData[] = users.map(user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  department: user.department,
  status: user.status,
  lastActive: user.lastActive,
}));

// Filters
export const filters: Filter[] = [
  {
    key: "department",
    label: "Department",
    type: "select",
    options: [
      { value: "IT Department", label: "IT Department" },
      { value: "Product Management", label: "Product Management" },
      { value: "Engineering", label: "Engineering" },
      { value: "Design", label: "Design" },
      { value: "Analytics", label: "Analytics" },
    ]
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "online", label: "Online" },
      { value: "offline", label: "Offline" },
      { value: "away", label: "Away" },
      { value: "busy", label: "Busy" },
    ]
  },
  {
    key: "search",
    label: "Search",
    type: "text",
    placeholder: "Search users..."
  }
];

// Search Results
export const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "User Management",
    description: "Manage system users and permissions",
    type: "page",
    url: "/users",
    metadata: { category: "Administration" }
  },
  {
    id: "2",
    title: "System Settings",
    description: "Configure system-wide settings",
    type: "page",
    url: "/settings",
    metadata: { category: "Configuration" }
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    description: "View system analytics and reports",
    type: "page",
    url: "/analytics",
    metadata: { category: "Reporting" }
  },
];

// Navigation Menu Items
export const navigationItems: MenuItem[] = [
  {
    id: "1",
    title: "Dashboard",
    icon: "home",
    path: "/",
    permissions: ["read"]
  },
  {
    id: "2",
    title: "Analytics",
    icon: "bar-chart",
    path: "/analytics",
    permissions: ["read"]
  },
  {
    id: "3",
    title: "Users",
    icon: "users",
    path: "/users",
    badge: users.filter(u => u.online).length,
    permissions: ["read"]
  },
  {
    id: "4",
    title: "Settings",
    icon: "settings",
    path: "/settings",
    permissions: ["write"]
  },
  {
    id: "5",
    title: "Reports",
    icon: "file-text",
    path: "/reports",
    permissions: ["read"]
  },
  {
    id: "6",
    title: "System",
    icon: "monitor",
    path: "/system",
    permissions: ["admin"]
  },
];

// System Settings
export const settings: Settings[] = [
  {
    id: "1",
    category: "General",
    key: "siteName",
    value: "Universal Dashboard",
    type: "string",
    description: "The name of your application",
    validation: { required: true }
  },
  {
    id: "2",
    category: "General",
    key: "theme",
    value: "light",
    type: "select",
    description: "Application theme",
    options: ["light", "dark", "auto"]
  },
  {
    id: "3",
    category: "Security",
    key: "sessionTimeout",
    value: 30,
    type: "number",
    description: "Session timeout in minutes",
    validation: { min: 5, max: 480 }
  },
  {
    id: "4",
    category: "Security",
    key: "requireTwoFactor",
    value: false,
    type: "boolean",
    description: "Require two-factor authentication"
  },
];

// File Uploads
export const fileUploads: FileUpload[] = [
  {
    id: "1",
    name: "user-data.csv",
    size: 1024000,
    type: "text/csv",
    url: "/uploads/user-data.csv",
    uploadedAt: new Date(Date.now() - 3600000).toISOString(),
    uploadedBy: users[1],
    category: "Data Export",
    tags: ["users", "csv", "export"]
  },
  {
    id: "2",
    name: "system-logs.txt",
    size: 2048000,
    type: "text/plain",
    url: "/uploads/system-logs.txt",
    uploadedAt: new Date(Date.now() - 7200000).toISOString(),
    uploadedBy: currentUser,
    category: "System Logs",
    tags: ["logs", "system", "debug"]
  },
];

// Reports
export const reports: Report[] = [
  {
    id: "1",
    title: "Monthly User Activity Report",
    description: "Comprehensive report of user activities for the current month",
    type: "activity",
    generatedBy: users[4],
    generatedAt: new Date(Date.now() - 86400000).toISOString(),
    data: { users: 150, activities: 2500, sessions: 1200 },
    format: "pdf",
    status: "completed",
    downloadUrl: "/reports/monthly-activity.pdf"
  },
  {
    id: "2",
    title: "System Performance Report",
    description: "Weekly system performance metrics and analysis",
    type: "performance",
    generatedBy: currentUser,
    generatedAt: new Date(Date.now() - 172800000).toISOString(),
    data: { uptime: 99.9, avgResponseTime: 120, errors: 5 },
    format: "excel",
    status: "completed",
    downloadUrl: "/reports/system-performance.xlsx"
  },
];

// Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "CREATE_USER",
    resource: "User",
    resourceId: "6",
    user: currentUser,
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    details: { email: "alice@company.com", role: "user" },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "2",
    action: "UPDATE_SETTINGS",
    resource: "Settings",
    resourceId: "1",
    user: users[3],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    details: { setting: "theme", oldValue: "light", newValue: "dark" },
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
];

// System Health
export const systemHealth: SystemHealth = {
  status: "healthy",
  services: [
    {
      name: "API Server",
      status: "up",
      responseTime: 45,
      lastCheck: new Date(Date.now() - 60000).toISOString()
    },
    {
      name: "Database",
      status: "up",
      responseTime: 12,
      lastCheck: new Date(Date.now() - 30000).toISOString()
    },
    {
      name: "File Storage",
      status: "up",
      responseTime: 8,
      lastCheck: new Date(Date.now() - 45000).toISOString()
    },
    {
      name: "Email Service",
      status: "degraded",
      responseTime: 1200,
      lastCheck: new Date(Date.now() - 120000).toISOString()
    }
  ],
  metrics: {
    cpu: 45,
    memory: 68,
    disk: 34,
    network: 12
  },
  uptime: "99.9%",
  lastUpdated: new Date().toISOString()
};