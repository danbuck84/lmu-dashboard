
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useRaceFormData } from './useRaceFormData';
import RaceForm from './RaceForm';
import type { RaceFormValues } from './race-form-schema';

type Race = {
  id: string;
  race_date: string;
  cars?: { model: string; class?: string };
  track_layouts?: { 
    name: string;
    tracks?: { name: string };
  };
  start_position: number;
  finish_position: number;
  driver_rating_change: number;
  safety_rating_change: number;
  incidents?: number;
  notes?: string;
  qualifying_position?: number;
  car_id?: string;
  track_layout_id?: string;
};

type EditRaceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  race: Race;
  onRaceUpdated: (updatedRace: Race) => void;
};

const EditRaceDialog = ({ open, onOpenChange, race, onRaceUpdated }: EditRaceDialogProps) => {
  const { cars, trackLayouts, loading, setLoading } = useRaceFormData(open);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  
  const formattedDate = race.race_date ? new Date(race.race_date).toISOString().split('T')[0] : '';

  // Format default values for the form
  const defaultValues = {
    date: formattedDate,
    car_id: race.car_id || '',
    track_layout_id: race.track_layout_id || '',
    start_position: race.start_position,
    finish_position: race.finish_position,
    driver_rating_change: race.driver_rating_change,
    safety_rating_change: race.safety_rating_change,
  };

  async function onSubmit(values: RaceFormValues) {
    try {
      setLoading(true);
      
      // Get current user ID
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      
      if (!userId) {
        toast.error('User session not found');
        return;
      }
      
      // Update race in database
      const { data, error } = await supabase
        .from('races')
        .update({
          race_date: new Date(values.date).toISOString(),
          car_id: values.car_id,
          track_layout_id: values.track_layout_id,
          start_position: values.start_position,
          finish_position: values.finish_position,
          driver_rating_change: values.driver_rating_change,
          safety_rating_change: values.safety_rating_change,
        })
        .eq('id', race.id)
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
          safety_rating_change,
          incidents,
          notes,
          qualifying_position
        `)
        .single();
        
      if (error) {
        console.error("Database error:", error);
        throw error;
      }
      
      toast.success('Race updated successfully!');
      onRaceUpdated(data as Race);
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating race:", error);
      toast.error("Failed to update race");
    } finally {
      setLoading(false);
    }
  }

  // Function to submit the form programmatically
  const handleSaveClick = () => {
    if (formRef) {
      formRef.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Race</DialogTitle>
          <DialogDescription>
            Update the details of your race. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <RaceForm 
          onSubmit={onSubmit}
          cars={cars}
          trackLayouts={trackLayouts}
          loading={loading}
          defaultValues={defaultValues}
        />
        
        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSaveClick}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditRaceDialog;
