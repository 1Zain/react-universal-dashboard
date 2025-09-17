
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <AppHeader />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
