
import React from 'react';
import { DashboardCard } from '@/components/DashboardCard';
import { ChartContainer } from '@/components/ChartContainer';
import { Activity, Award, Car, Flag, Timer, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Mock data
const ratingData = [
  { date: '2023-01-01', dr: 1200, sr: 800 },
  { date: '2023-02-01', dr: 1250, sr: 850 },
  { date: '2023-03-01', dr: 1230, sr: 870 },
  { date: '2023-04-01', dr: 1280, sr: 890 },
  { date: '2023-05-01', dr: 1310, sr: 910 },
  { date: '2023-06-01', dr: 1350, sr: 930 },
  { date: '2023-07-01', dr: 1400, sr: 950 },
];

const positionData = [
  { name: '1st', value: 5 },
  { name: '2nd', value: 7 },
  { name: '3rd', value: 4 },
  { name: '4th-10th', value: 12 },
  { name: '11th+', value: 8 },
];

const carUsageData = [
  { name: 'Porsche 911 GT3', value: 15 },
  { name: 'Ferrari 488', value: 8 },
  { name: 'Audi R8', value: 6 },
  { name: 'BMW M4', value: 4 },
  { name: 'Mercedes AMG GT', value: 3 },
];

const trackUsageData = [
  { name: 'Spa', value: 8 },
  { name: 'Monza', value: 6 },
  { name: 'Le Mans', value: 10 },
  { name: 'Nürburgring', value: 5 },
  { name: 'Silverstone', value: 7 },
];

const monthlyRacesData = [
  { name: 'Jan', races: 4 },
  { name: 'Feb', races: 6 },
  { name: 'Mar', races: 3 },
  { name: 'Apr', races: 8 },
  { name: 'May', races: 5 },
  { name: 'Jun', races: 9 },
  { name: 'Jul', races: 7 },
];

const incidentsData = [
  { date: '2023-01-01', incidents: 5 },
  { date: '2023-02-01', incidents: 3 },
  { date: '2023-03-01', incidents: 4 },
  { date: '2023-04-01', incidents: 2 },
  { date: '2023-05-01', incidents: 1 },
  { date: '2023-06-01', incidents: 2 },
  { date: '2023-07-01', incidents: 0 },
];

// Colors
const COLORS = ['#0057B7', '#E10600', '#FF9E01', '#4CAF50', '#9C27B0'];

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-500">Overview of your racing performance and statistics</p>
        </div>
        
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Driver Rating"
            subtitle="Current: Platinum 2"
            icon={<Award className="h-5 w-5" />}
            className="animate-scale-in"
          >
            <div className="mt-2">
              <div className="text-3xl font-bold text-racing-blue">1400</div>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+50 last month</span>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Safety Rating"
            subtitle="Current: S License"
            icon={<Activity className="h-5 w-5" />}
            className="animate-scale-in [animation-delay:100ms]"
          >
            <div className="mt-2">
              <div className="text-3xl font-bold text-racing-red">950</div>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+20 last month</span>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Total Races"
            subtitle="Since tracking began"
            icon={<Flag className="h-5 w-5" />}
            className="animate-scale-in [animation-delay:200ms]"
          >
            <div className="mt-2">
              <div className="text-3xl font-bold">36</div>
              <div className="text-slate-500 text-sm mt-1">
                Last race: 2 days ago
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Best Lap Time"
            subtitle="Le Mans, GT3 Class"
            icon={<Timer className="h-5 w-5" />}
            className="animate-scale-in [animation-delay:300ms]"
          >
            <div className="mt-2">
              <div className="text-3xl font-bold">3:48.231</div>
              <div className="text-slate-500 text-sm mt-1">
                Porsche 911 GT3
              </div>
            </div>
          </DashboardCard>
        </div>
        
        {/* Charts - First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartContainer 
            title="Rating Progression" 
            description="Driver and Safety Rating over time"
            height={300}
          >
            <LineChart data={ratingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleString('default', { month: 'short' })}`;
                }}
              />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  });
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="dr" 
                name="Driver Rating" 
                stroke="#0057B7" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sr" 
                name="Safety Rating" 
                stroke="#E10600" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
          
          <ChartContainer 
            title="Monthly Races" 
            description="Number of races per month"
            height={300}
          >
            <BarChart data={monthlyRacesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              />
              <Bar 
                dataKey="races" 
                name="Races" 
                fill="#0057B7" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ChartContainer>
        </div>
        
        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <ChartContainer 
            title="Car Usage" 
            description="Races by car model"
            height={240}
          >
            <PieChart>
              <Pie
                data={carUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {carUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
          
          <ChartContainer 
            title="Track Usage" 
            description="Races by track"
            height={240}
          >
            <PieChart>
              <Pie
                data={trackUsageData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {trackUsageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
          
          <ChartContainer 
            title="Finishing Positions" 
            description="Distribution of race results"
            height={240}
          >
            <PieChart>
              <Pie
                data={positionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {positionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ChartContainer>
        </div>
        
        {/* Charts - Third Row */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <ChartContainer 
            title="Incidents Over Time" 
            description="Track your racing discipline progress"
            height={250}
          >
            <LineChart data={incidentsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.toLocaleString('default', { month: 'short' })}`;
                }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  });
                }}
              />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                name="Incidents" 
                stroke="#E10600" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
