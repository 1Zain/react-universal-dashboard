import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
  onClick?: () => void;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "text-blue-500",
  trend,
  description,
  onClick,
  className
}: StatsCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        onClick && "hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div className="flex items-center">
                <span className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-500" : "text-red-500"
                )}>
                  {trend.isPositive ? "+" : ""}{trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-full", color.replace("text-", "bg-").replace("-500", "-100"))}>
            <Icon className={cn("h-6 w-6", color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
