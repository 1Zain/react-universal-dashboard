export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  title: string;
  department: string;
  avatar?: string;
  role: string;
  permissions: string[];
  lastLogin?: string;
  isActive: boolean;
  status?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  timezone?: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn?: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface UpdateProfileRequest {
  name?: string;
  title?: string;
  department?: string;
  avatar?: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}