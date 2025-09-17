import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, User, Lock, LogIn, AlertTriangle, Shield, Monitor } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import type { LoginRequest } from "@/api/auth/types";

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "admin@company.com",
      password: "admin123",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const loginData = await authService.login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });


      // Use the auth hook to handle login
      login(loginData.token, loginData.user, loginData.refreshToken);
      
      // Navigate to dashboard
      navigate("/", { replace: true });
    } catch (error: any) {
      setLoginError(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-900 rounded-xl flex items-center justify-center shadow-lg">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Universal Dashboard
                </h1>
                <p className="text-sm text-slate-600">Enterprise Management System</p>
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Secure Access Portal
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="border-white/20 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4 pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Sign in to your dashboard account
                </CardDescription>
              </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Security Notice</p>
                      <p>All login attempts are logged and monitored. Use only authorized credentials.</p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {loginError && (
                  <Alert variant="destructive" className="border-red-300 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-red-800">
                      {loginError}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email"
                      className={`pl-10 h-12 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                        errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
                      }`}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 h-12 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                        errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
                      }`}
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-12 w-10 hover:bg-slate-100/50"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400 opacity-60" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400 opacity-60" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 font-medium">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register("rememberMe")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-slate-600">
                    Remember me for 30 days
                  </Label>
                </div>

                <Separator />

                {/* Login Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <LogIn className="w-4 h-4" />
                      <span>Sign In</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </form>
          </Card>

          {/* Footer Information */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-xs text-slate-500 space-y-1">
              <p>© 2025 Universal Dashboard</p>
              <p>All rights reserved | Version 1.0.0</p>
            </div>
            <div className="text-xs text-slate-400">
              <p>Demo Credentials: admin@company.com / admin123</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}