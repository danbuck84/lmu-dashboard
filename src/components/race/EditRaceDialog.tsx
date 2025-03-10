
import { useState } from 'react';
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
import type { Race } from './table/types';

type EditRaceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  race: Race;
  onRaceUpdated: (updatedRace: Race) => void;
};

const EditRaceDialog = ({ open, onOpenChange, race, onRaceUpdated }: EditRaceDialogProps) => {
  const { cars, trackLayouts, loading, setLoading } = useRaceFormData(open);
  
  // Format the date with timezone adjustment to prevent off-by-one day errors
  const formattedDate = race.race_date 
    ? new Date(race.race_date).toLocaleDateString('en-CA') // YYYY-MM-DD format
    : '';

  // Format default values for the form
  const defaultValues = {
    date: formattedDate,
    car_id: race.car_id || '',
    track_layout_id: race.track_layout_id || '',
    start_position: race.start_position,
    finish_position: race.finish_position,
    series: race.series || '',
    notes: race.notes || '',
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
      
      // Use the input date and preserve the time component
      const dateValue = new Date(values.date);
      
      // Update race in database
      const { data, error } = await supabase
        .from('races')
        .update({
          race_date: dateValue.toISOString(),
          car_id: values.car_id,
          track_layout_id: values.track_layout_id,
          start_position: values.start_position,
          finish_position: values.finish_position,
          driver_rating_change: values.driver_rating_change,
          safety_rating_change: values.safety_rating_change,
          series: values.series,
          notes: values.notes,
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
          series,
          notes
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
    if (typeof window !== 'undefined' && window.raceFormElement) {
      window.raceFormElement.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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
        
        <DialogFooter className="flex flex-row justify-end gap-2 pt-4">
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
