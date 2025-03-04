
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export function useRaceFormData(isOpen: boolean) {
  const [cars, setCars] = useState<any[]>([]);
  const [trackLayouts, setTrackLayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          setLoading(true);
          
          // Get cars
          const { data: carsData, error: carsError } = await supabase
            .from('cars')
            .select('*')
            .order('model');
            
          if (carsError) throw carsError;
          setCars(carsData || []);
          
          // Get track layouts with track names
          const { data: layoutsData, error: layoutsError } = await supabase
            .from('track_layouts')
            .select('*, tracks(name)')
            .order('name');
            
          if (layoutsError) throw layoutsError;
          setTrackLayouts(layoutsData || []);
        } catch (error) {
          console.error('Error fetching data:', error);
          toast.error('Failed to load form data');
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }
  }, [isOpen]);

  return { cars, trackLayouts, loading, setLoading };
}
