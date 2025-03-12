import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { RatingChangesData } from '@/components/race/analytics/types';

type RatingChangesChartProps = {
  data: RatingChangesData[];
};

const RatingChangesChart: React.FC<RatingChangesChartProps> = ({ data }) => {
  return (
    <ChartCard title="Rating Changes Over Time">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => [value.toFixed(2), '']}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="driverRating" 
            name="Driver Rating" 
            stroke="#8884d8" 
            activeDot={{ r: 8 }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="safetyRating" 
            name="Safety Rating" 
            stroke="#82ca9d" 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RatingChangesChart;
