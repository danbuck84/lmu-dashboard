
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRaceData } from '@/components/race/useRaceData';
import { useRaceAnalytics } from '@/components/race/useRaceAnalytics';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import RacesPerMonthChart from '@/components/dashboard/RacesPerMonthChart';
import PositionChangesChart from '@/components/dashboard/PositionChangesChart';
import RatingChangesChart from '@/components/dashboard/RatingChangesChart';
import CarUsageChart from '@/components/dashboard/CarUsageChart';
import TrackUsageChart from '@/components/dashboard/TrackUsageChart';
import RacePositionHistoryChart from '@/components/dashboard/RacePositionHistoryChart';

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
    <DashboardLayout loading={loading} races={races}>
      <RacesPerMonthChart data={racesPerMonth} />
      <PositionChangesChart data={positionChanges} />
      <RatingChangesChart data={ratingChanges} />
      <CarUsageChart data={carUsage} />
      <TrackUsageChart data={trackUsage} />
      <RacePositionHistoryChart data={racePositionHistory} />
    </DashboardLayout>
  );
};

export default Dashboard;
