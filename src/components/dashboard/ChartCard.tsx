import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart, 
  TrendingUp,
  Download,
  RefreshCw,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";

export interface ChartData {
  name: string;
  value: number;
  color?: string;
  [key: string]: any;
}

interface ChartCardProps {
  title: string;
  description?: string;
  data: ChartData[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  height?: number;
  showControls?: boolean;
  onRefresh?: () => void;
  onExport?: () => void;
  onSettings?: () => void;
  className?: string;
}

export const ChartCard = ({
  title,
  description,
  data,
  type,
  height = 300,
  showControls = true,
  onRefresh,
  onExport,
  onSettings,
  className
}: ChartCardProps) => {
  const getChartIcon = () => {
    switch (type) {
      case 'line': return <LineChartIcon className="h-5 w-5" />;
      case 'bar': return <BarChart3 className="h-5 w-5" />;
      case 'pie': return <PieChart className="h-5 w-5" />;
      case 'area': return <TrendingUp className="h-5 w-5" />;
      case 'donut': return <PieChart className="h-5 w-5" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  const chartConfig = {
    value: {
      label: "Value",
    },
    users: {
      label: "Users",
    },
    sessions: {
      label: "Sessions",
    },
    growth: {
      label: "Growth %",
    },
    change: {
      label: "Change %",
    },
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#84cc16', '#f97316'];

  const renderChart = () => {
    const chartHeight = height - 20; // Account for padding

    switch (type) {
      case 'line':
        return (
          <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        );

      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        );

      case 'pie':
        return (
          <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </RechartsPieChart>
          </ChartContainer>
        );

      case 'donut':
        return (
          <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </RechartsPieChart>
          </ChartContainer>
        );

      case 'area':
        return (
          <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        );

      default:
        return (
          <div 
            className="flex items-center justify-center bg-muted/20 rounded-lg"
            style={{ height: `${chartHeight}px` }}
          >
            <div className="text-center">
              {getChartIcon()}
              <p className="text-sm text-muted-foreground mt-2">
                Chart type not supported
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {getChartIcon()}
              {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {showControls && (
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button variant="outline" size="sm" onClick={onRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4" />
                </Button>
              )}
              {onSettings && (
                <Button variant="outline" size="sm" onClick={onSettings}>
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

// Example usage component for different chart types
export const ChartExamples = () => {
  const sampleData = [
    { name: 'Jan', value: 400, color: '#3b82f6' },
    { name: 'Feb', value: 300, color: '#10b981' },
    { name: 'Mar', value: 500, color: '#f59e0b' },
    { name: 'Apr', value: 450, color: '#ef4444' },
    { name: 'May', value: 600, color: '#8b5cf6' },
    { name: 'Jun', value: 550, color: '#06b6d4' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard
        title="Line Chart Example"
        description="Trend over time"
        data={sampleData}
        type="line"
        onRefresh={() => {}}
        onExport={() => {}}
      />
      <ChartCard
        title="Bar Chart Example"
        description="Comparison data"
        data={sampleData}
        type="bar"
        onRefresh={() => {}}
        onExport={() => {}}
      />
      <ChartCard
        title="Pie Chart Example"
        description="Distribution data"
        data={sampleData.slice(0, 4)}
        type="pie"
        onRefresh={() => {}}
        onExport={() => {}}
      />
      <ChartCard
        title="Area Chart Example"
        description="Cumulative data"
        data={sampleData}
        type="area"
        onRefresh={() => {}}
        onExport={() => {}}
      />
    </div>
  );
};
