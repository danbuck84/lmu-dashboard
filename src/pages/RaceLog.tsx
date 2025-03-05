
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddRaceDialog from '@/components/AddRaceDialog';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';
import RaceFilters from '@/components/race/RaceFilters';
import RaceStatistics from '@/components/race/RaceStatistics';
import RaceTable from '@/components/race/RaceTable';
import { useRaceData } from '@/components/race/useRaceData';

const RaceLog = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { 
    filteredRaces, 
    loading, 
    cars, 
    trackLayouts, 
    filters, 
    setFilters, 
    clearFilters, 
    handleRaceAdded 
  } = useRaceData();

  // Check if user is authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to view race logs');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Race Log</h1>
          <AddRaceDialog onRaceAdded={handleRaceAdded} />
        </div>
        
        {!loading && filteredRaces.length > 0 && (
          <>
            <RaceStatistics races={filteredRaces} />
            
            <RaceFilters 
              cars={cars} 
              trackLayouts={trackLayouts} 
              filters={filters} 
              setFilters={setFilters} 
              clearFilters={clearFilters} 
            />
          </>
        )}
        
        <div className="bg-card rounded-lg shadow p-6">
          {loading ? (
            <p className="text-center py-4">Loading races...</p>
          ) : filteredRaces.length > 0 ? (
            <RaceTable races={filteredRaces} loading={loading} />
          ) : cars.length > 0 ? (
            <p className="text-muted-foreground text-center py-4">No races match the selected filters.</p>
          ) : (
            <p className="text-muted-foreground text-center py-4">Your race logs will appear here. Add your first race to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceLog;
