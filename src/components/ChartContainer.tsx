
import React, { useState } from 'react';
import { DashboardCard } from './DashboardCard';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  height?: number;
  options?: {
    downloadCSV?: boolean;
    toggleMode?: boolean;
    fullscreen?: boolean;
  };
}

type ChartMode = 'bar' | 'line' | 'pie';

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  description,
  children,
  className,
  height = 300,
  options = {
    downloadCSV: false,
    toggleMode: false,
    fullscreen: false
  }
}) => {
  const [chartMode, setChartMode] = useState<ChartMode>('bar');
  
  const handleModeChange = (mode: ChartMode) => {
    setChartMode(mode);
  };
  
  return (
    <DashboardCard 
      className={cn("overflow-hidden", className)}
      title={title}
      subtitle={description}
      footer={
        options.toggleMode ? (
          <div className="flex items-center justify-end space-x-2">
            <button 
              onClick={() => handleModeChange('bar')}
              className={cn(
                "p-1.5 rounded-md",
                chartMode === 'bar' ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:text-slate-500"
              )}
            >
              <BarChart size={16} />
            </button>
            <button 
              onClick={() => handleModeChange('line')}
              className={cn(
                "p-1.5 rounded-md",
                chartMode === 'line' ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:text-slate-500"
              )}
            >
              <LineChart size={16} />
            </button>
            <button 
              onClick={() => handleModeChange('pie')}
              className={cn(
                "p-1.5 rounded-md",
                chartMode === 'pie' ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:text-slate-500"
              )}
            >
              <PieChart size={16} />
            </button>
          </div>
        ) : null
      }
    >
      <div className="pt-2">
        <ResponsiveContainer width="100%" height={height}>
          {children}
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export { ChartContainer };
