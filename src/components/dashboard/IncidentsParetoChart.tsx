
import React from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import ChartCard from './ChartCard';
import { ParetoData } from '../race/analytics/calculateParetoData';

interface IncidentsParetoChartProps {
  data: ParetoData[];
}

const IncidentsParetoChart: React.FC<IncidentsParetoChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <ChartCard title="Incidents by Track (Pareto)">
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No incident data available</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Incidents by Track (Pareto)">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} unit="%" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="value" name="Incidents" fill="#8884d8" barSize={30} />
          <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Cumulative %" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default IncidentsParetoChart;
