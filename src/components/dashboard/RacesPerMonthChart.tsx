
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { RacesPerMonthData } from '@/components/race/analytics/types';

type RacesPerMonthChartProps = {
  data: RacesPerMonthData[];
};

const RacesPerMonthChart: React.FC<RacesPerMonthChartProps> = ({ data }) => {
  return (
    <ChartCard title="Races Per Month" className="col-span-1 md:col-span-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            name="Number of Races" 
            fill="#8884d8" 
            animationDuration={1500} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RacesPerMonthChart;
