
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: "default" | "ghost" | "outline" | "secondary" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  badge?: number;
}

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  badge,
  className,
  ...props
}: IconButtonProps) {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="badge-notification">{badge > 9 ? "9+" : badge}</span>
      )}
    </button>
  );
}
