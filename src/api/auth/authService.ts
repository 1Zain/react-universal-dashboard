import type { LoginRequest, LoginResponse, ChangePasswordRequest, ResetPasswordRequest, UpdateProfileRequest } from './types';

// Default credentials for demo
const DEFAULT_EMAIL = 'admin@company.com';
const DEFAULT_PASSWORD = 'admin123';

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials against default values
    if (credentials.email === DEFAULT_EMAIL && credentials.password === DEFAULT_PASSWORD) {
      return {
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user: {
          id: '1',
          email: DEFAULT_EMAIL,
          name: 'John Doe',
          title: 'System Administrator',
          department: 'IT Department',
          avatar: '/placeholder.svg',
          role: 'admin',
          permissions: ['read', 'write', 'delete', 'admin'],
          lastLogin: new Date().toISOString(),
          isActive: true
        },
        expiresIn: 3600 // 1 hour
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock implementation - always succeed
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string; refreshToken: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    };
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation - always succeed
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation - always succeed
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock implementation - always succeed
  },

  verifyToken: async (token: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock implementation - always return true for demo
    return true;
  },

  getCurrentUser: async (): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      id: '1',
      email: DEFAULT_EMAIL,
      name: 'John Doe',
      title: 'System Administrator',
      department: 'IT Department',
      avatar: '/placeholder.svg',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      lastLogin: new Date().toISOString(),
      isActive: true
    };
  }
};