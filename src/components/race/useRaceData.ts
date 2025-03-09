
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { FilterOptions } from './RaceFilters';

export function useRaceData() {
  const [races, setRaces] = useState<any[]>([]);
  const [filteredRaces, setFilteredRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<any[]>([]);
  const [trackLayouts, setTrackLayouts] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});

  useEffect(() => {
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
        
        const [raceResponse, carsResponse, layoutsResponse] = await Promise.all([
          supabase
            .from('races')
            .select(`
              id,
              race_date,
              car_id,
              cars(model, class),
              track_layout_id,
              track_layouts(name, tracks(name)),
              start_position,
              finish_position,
              driver_rating_change,
              safety_rating_change
            `)
            .eq('user_id', userId)
            .order('race_date', { ascending: false }),
          
          supabase
            .from('cars')
            .select('*')
            .order('model'),
          
          supabase
            .from('track_layouts')
            .select('*, tracks(name)')
            .order('name')
        ]);
          
        if (raceResponse.error) throw raceResponse.error;
        if (carsResponse.error) throw carsResponse.error;
        if (layoutsResponse.error) throw layoutsResponse.error;
        
        console.log('Races loaded:', raceResponse.data);
        setRaces(raceResponse.data || []);
        setFilteredRaces(raceResponse.data || []);
        setCars(carsResponse.data || []);
        setTrackLayouts(layoutsResponse.data || []);
      } catch (error) {
        console.error('Error fetching races:', error);
        toast.error('Failed to load races');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  useEffect(() => {
    // Apply filters whenever the filters or races change
    applyFilters();
  }, [filters, races]);

  const applyFilters = () => {
    let filtered = [...races];
    
    // Filter by car
    if (filters.carId) {
      filtered = filtered.filter(race => race.car_id === filters.carId);
    }
    
    // Filter by track layout
    if (filters.trackLayoutId) {
      filtered = filtered.filter(race => race.track_layout_id === filters.trackLayoutId);
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(race => new Date(race.race_date) >= fromDate);
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      filtered = filtered.filter(race => new Date(race.race_date) <= toDate);
    }
    
    // Filter by position change
    if (filters.positionChange) {
      switch (filters.positionChange) {
        case 'improved':
          filtered = filtered.filter(race => race.finish_position < race.start_position);
          break;
        case 'declined':
          filtered = filtered.filter(race => race.finish_position > race.start_position);
          break;
        case 'same':
          filtered = filtered.filter(race => race.finish_position === race.start_position);
          break;
      }
    }
    
    setFilteredRaces(filtered);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const handleRaceAdded = (newRace: any) => {
    setRaces(prevRaces => [newRace, ...prevRaces]);
  };

  return {
    races,
    filteredRaces,
    loading,
    cars,
    trackLayouts,
    filters,
    setFilters,
    clearFilters,
    handleRaceAdded
  };
}
