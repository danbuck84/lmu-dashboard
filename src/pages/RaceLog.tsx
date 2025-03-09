
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
import { Card } from '@/components/ui/card';

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
    handleRaceAdded,
    handleRaceDeleted,
    handleRaceUpdated
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
    <div className="min-h-screen flex flex-col bg-checkered-pattern bg-fixed bg-no-repeat bg-cover">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1 relative z-10">
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
        
        <Card className="p-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm">
          {loading ? (
            <p className="text-center py-4">Loading races...</p>
          ) : filteredRaces.length > 0 ? (
            <RaceTable 
              races={filteredRaces} 
              loading={loading} 
              onRaceDeleted={handleRaceDeleted}
              onRaceUpdated={handleRaceUpdated}
            />
          ) : cars.length > 0 ? (
            <p className="text-muted-foreground text-center py-4">No races match the selected filters.</p>
          ) : (
            <p className="text-muted-foreground text-center py-4">Your race logs will appear here. Add your first race to get started.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RaceLog;
