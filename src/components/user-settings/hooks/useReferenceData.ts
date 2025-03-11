
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useReferenceData = (isAuthenticated: boolean) => {
  const [cars, setCars] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        // Fetch car and track data in parallel
        const [carsResponse, tracksResponse] = await Promise.all([
          supabase.from('cars').select('*').order('model'),
          supabase.from('tracks').select('*').order('name')
        ]);
        
        if (carsResponse.error) throw carsResponse.error;
        if (tracksResponse.error) throw tracksResponse.error;
        
        setCars(carsResponse.data || []);
        setTracks(tracksResponse.data || []);
      } catch (error) {
        console.error('Error fetching reference data:', error);
        toast.error('Failed to load reference data');
      }
    };

    if (isAuthenticated) {
      fetchReferenceData();
    }
  }, [isAuthenticated]);

  return { cars, tracks };
};
