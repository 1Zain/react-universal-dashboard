
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  colorClass?: string;
  onClick?: () => void;
}

export function DashboardCard({ 
  title, 
  value, 
  icon, 
  colorClass = "text-primary",
  onClick 
}: DashboardCardProps) {
  return (
    <Card 
      className={cn(
        "transition-all duration-200",
        onClick ? "cursor-pointer hover:shadow-md hover:-translate-y-1" : ""
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className={cn("p-2 rounded-full bg-muted", colorClass)}>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
