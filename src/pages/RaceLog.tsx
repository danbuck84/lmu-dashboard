
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddRaceDialog from '@/components/AddRaceDialog';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const RaceLog = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please log in to view race logs');
      navigate('/login');
      return;
    }

    // Load races from Supabase
    const fetchRaces = async () => {
      try {
        setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData.session?.user.id;
        
        if (!userId) {
          toast.error('User session not found');
          return;
        }
        
        const { data, error } = await supabase
          .from('races')
          .select(`
            *,
            cars(model, class),
            track_layouts(name, track_id),
            track_layouts.tracks(name)
          `)
          .eq('user_id', userId)
          .order('race_date', { ascending: false });
          
        if (error) throw error;
        setRaces(data || []);
      } catch (error) {
        console.error('Error fetching races:', error);
        toast.error('Failed to load races');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [isAuthenticated, navigate]);

  const handleRaceAdded = (newRace: any) => {
    setRaces(prevRaces => [newRace, ...prevRaces]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Race Log</h1>
          {isAuthenticated && <AddRaceDialog onRaceAdded={handleRaceAdded} />}
        </div>
        
        <div className="bg-card rounded-lg shadow p-6">
          {loading ? (
            <p className="text-center py-4">Loading races...</p>
          ) : races.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Car</th>
                    <th className="py-2 px-4 text-left">Track</th>
                    <th className="py-2 px-4 text-center">Start</th>
                    <th className="py-2 px-4 text-center">Finish</th>
                    <th className="py-2 px-4 text-center">DR Change</th>
                    <th className="py-2 px-4 text-center">SR Change</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {races.map((race) => (
                    <tr key={race.id} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{new Date(race.race_date).toLocaleDateString()}</td>
                      <td className="py-2 px-4">{race.cars?.model}</td>
                      <td className="py-2 px-4">{race.track_layouts?.tracks?.name} ({race.track_layouts?.name})</td>
                      <td className="py-2 px-4 text-center">{race.start_position}</td>
                      <td className="py-2 px-4 text-center">{race.finish_position}</td>
                      <td className="py-2 px-4 text-center">
                        <span className={race.driver_rating_change > 0 ? 'text-green-500' : race.driver_rating_change < 0 ? 'text-red-500' : ''}>
                          {race.driver_rating_change > 0 ? `+${race.driver_rating_change}` : race.driver_rating_change}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className={race.safety_rating_change > 0 ? 'text-green-500' : race.safety_rating_change < 0 ? 'text-red-500' : ''}>
                          {race.safety_rating_change > 0 ? `+${race.safety_rating_change}` : race.safety_rating_change}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">Your race logs will appear here. Add your first race to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceLog;
