import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useAuth } from "@/hooks/useAuth";
import Dashboard from "./pages/Dashboard";
import AnalyticsPage from "./pages/AnalyticsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import ReportsPage from "./pages/ReportsPage";
import SystemPage from "./pages/SystemPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import TableDemoPage from "./pages/TableDemoPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Layout wrapper component
const LayoutWrapper = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LayoutWrapper />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="system" element={<SystemPage />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="table-demo" element={<TableDemoPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;