import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { TrackUsageData } from '@/components/race/analytics/types';

type TrackUsageChartProps = {
  data: TrackUsageData[];
};

const TrackUsageChart: React.FC<TrackUsageChartProps> = ({ data }) => {
  // Show only top 5 tracks
  const topTracks = data.slice(0, 5);
  
  return (
    <ChartCard title="Most Raced Tracks">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topTracks}
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
            fill="#8884d8" 
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TrackUsageChart;
