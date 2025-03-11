
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRaceData } from '@/components/race/useRaceData';
import { useRaceAnalytics } from '@/components/race/useRaceAnalytics';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';
import { toast } from 'sonner';

// Custom colors for charts
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F', '#FFBB28', '#FF8042'];
const POSITION_COLORS = {
  Improved: '#4ade80', // green
  Declined: '#ef4444', // red
  Same: '#f59e0b'      // amber
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { races, loading } = useRaceData();
  const { 
    racesPerMonth,
    positionChanges,
    carUsage,
    trackUsage,
    ratingChanges,
    racePositionHistory
  } = useRaceAnalytics(races);

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view your dashboard');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-checkered-pattern bg-fixed bg-no-repeat bg-cover">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1 relative z-10">
        <h1 className="text-2xl font-bold mb-6">Racing Dashboard</h1>
        
        {loading ? (
          <Card className="p-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm">
            <p className="text-center py-4">Loading dashboard data...</p>
          </Card>
        ) : races.length === 0 ? (
          <Card className="p-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm">
            <p className="text-muted-foreground text-center py-4">
              No race data available. Add races in your Race Log to see analytics here.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Races Per Month Chart */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Races Per Month</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={racesPerMonth}>
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
              </CardContent>
            </Card>

            {/* Position Changes Pie Chart */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Position Changes</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={positionChanges}
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
                      {positionChanges.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={POSITION_COLORS[entry.name as keyof typeof POSITION_COLORS] || COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`${value} races`, ``]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Driver & Safety Rating Changes Over Time */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Rating Changes Over Time</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingChanges}>
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
              </CardContent>
            </Card>

            {/* Most Used Cars */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Most Used Cars</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={carUsage.slice(0, 5)} // Show top 5 cars
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
              </CardContent>
            </Card>

            {/* Most Raced Tracks */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Most Raced Tracks</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trackUsage.slice(0, 5)} // Show top 5 tracks
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
              </CardContent>
            </Card>

            {/* Race Position History */}
            <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Race Position History</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={racePositionHistory}>
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
                        return [
                          `P${value}`, 
                          name === 'startPosition' ? 'Starting Position' : 'Finishing Position'
                        ];
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
