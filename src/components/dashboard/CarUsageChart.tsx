import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { CarUsageData } from '@/components/race/analytics/types';

type CarUsageChartProps = {
  data: CarUsageData[];
};

const CarUsageChart: React.FC<CarUsageChartProps> = ({ data }) => {
  // Show only top 5 cars
  const topCars = data.slice(0, 5);
  
  return (
    <ChartCard title="Most Used Cars">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topCars}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={100}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="races" 
            name="Number of Races" 
            fill="#82ca9d" 
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default CarUsageChart;
