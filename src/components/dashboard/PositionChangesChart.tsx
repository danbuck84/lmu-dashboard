
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import ChartCard from './ChartCard';
import { PositionChangeData } from '@/components/race/useRaceAnalytics';

// Custom colors for position changes
const POSITION_COLORS = {
  Improved: '#4ade80', // green
  Declined: '#ef4444', // red
  Same: '#f59e0b'      // amber
};

type PositionChangesChartProps = {
  data: PositionChangeData[];
};

const PositionChangesChart: React.FC<PositionChangesChartProps> = ({ data }) => {
  return (
    <ChartCard title="Position Changes">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            animationDuration={1500}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={POSITION_COLORS[entry.name as keyof typeof POSITION_COLORS] || '#8884d8'} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} races`, ``]}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PositionChangesChart;
