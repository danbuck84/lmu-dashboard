
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ChartCard from './ChartCard';
import { RaceHistoryData } from '@/components/race/analytics/types';

type RacePositionHistoryChartProps = {
  data: RaceHistoryData[];
};

const RacePositionHistoryChart: React.FC<RacePositionHistoryChartProps> = ({ data }) => {
  return (
    <ChartCard title="Race Position History" className="col-span-1 md:col-span-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="raceId" 
            label={{ value: 'Race Number', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis 
            reversed 
            domain={[1, 'dataMax']}
            label={{ value: 'Position', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            labelFormatter={(value) => `Race ${value}`}
            formatter={(value, name) => {
              if (name === 'startPosition') {
                return [`P${value}`, 'Starting Position'];
              }
              if (name === 'finishPosition') {
                return [`P${value}`, 'Finishing Position'];
              }
              return [value, name];
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="startPosition" 
            name="Starting Position" 
            stroke="#ffc658" 
            strokeDasharray="5 5"
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="finishPosition" 
            name="Finishing Position" 
            stroke="#82ca9d" 
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RacePositionHistoryChart;
