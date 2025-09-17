// Universal Dashboard Types

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  avatar: string;
  online?: boolean;
  status?: 'online' | 'away' | 'busy' | 'offline';
  role?: string;
  permissions?: string[];
  lastActive?: string;
}

export interface DashboardStats {
  id: string;
  title: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  user: User;
  type: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'system';
  category: string;
  metadata?: Record<string, any>;
}

export interface Notification {
  link: string;
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  category: string;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
  expiresAt?: string;
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  data: any[];
  options?: Record<string, any>;
  description?: string;
}

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'action';
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableData {
  id: string;
  [key: string]: any;
}

export interface Filter {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'number' | 'boolean';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: string;
  url: string;
  metadata?: Record<string, any>;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  badge?: number;
  children?: MenuItem[];
  permissions?: string[];
}

export interface Settings {
  id: string;
  category: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'select';
  description?: string;
  options?: any[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: User;
  category?: string;
  tags?: string[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  generatedBy: User;
  generatedAt: string;
  data: any;
  format: 'pdf' | 'excel' | 'csv' | 'json';
  status: 'generating' | 'completed' | 'failed';
  downloadUrl?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  user: User;
  timestamp: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  services: {
    name: string;
    status: 'up' | 'down' | 'degraded';
    responseTime?: number;
    lastCheck: string;
  }[];
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  uptime: string;
  lastUpdated: string;
}

// Generic API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

// Theme and UI Types
export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}

export interface LayoutConfig {
  sidebar: {
    collapsed: boolean;
    width: number;
    position: 'left' | 'right';
  };
  header: {
    height: number;
    sticky: boolean;
  };
  footer: {
    visible: boolean;
    height: number;
  };
}