import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="opacity-70">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    </Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-background border-primary/50">
          {theme === "dark" ? (
            <Moon className="h-[1.3rem] w-[1.3rem] text-primary" />
          ) : (
            <Sun className="h-[1.3rem] w-[1.3rem] text-primary" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        <DropdownMenuItem 
          onClick={() => setTheme("light")} 
          className={theme === "light" ? "bg-secondary" : ""}
        >
          <div className="flex w-full flex-row-reverse justify-between items-center">
            <span>light</span>
            <Sun className="h-4 w-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")} 
          className={theme === "dark" ? "bg-secondary" : ""}
        >
          <div className="flex w-full flex-row-reverse justify-between items-center">
            <span>dark</span>
            <Moon className="h-4 w-4" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")} 
          className={theme === "system" ? "bg-secondary" : ""}
        >
          <div className="flex w-full flex-row-reverse justify-between items-center">
            <span>system</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 