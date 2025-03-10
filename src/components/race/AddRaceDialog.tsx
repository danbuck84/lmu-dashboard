
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { useRaceFormData } from './useRaceFormData';
import RaceForm from './RaceForm';
import type { RaceFormValues } from './race-form-schema';

type AddRaceDialogProps = {
  onRaceAdded: (raceData: any) => void;
};

const AddRaceDialog = ({ onRaceAdded }: AddRaceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { cars, trackLayouts, loading, setLoading } = useRaceFormData(open);

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
      
      // Insert race into database
      const { data, error } = await supabase
        .from('races')
        .insert({
          user_id: userId,
          race_date: dateValue.toISOString(),
          car_id: values.car_id,
          track_layout_id: values.track_layout_id,
          start_position: values.start_position,
          finish_position: values.finish_position,
          driver_rating_change: values.driver_rating_change,
          safety_rating_change: values.safety_rating_change,
          notes: values.notes,
        })
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
          notes
        `)
        .single();
        
      if (error) {
        console.error("Database error:", error);
        throw error;
      }
      
      toast.success('Race added successfully!');
      onRaceAdded(data);
      setOpen(false);
    } catch (error) {
      console.error("Error adding race:", error);
      toast.error("Failed to add race");
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Race
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Race</DialogTitle>
          <DialogDescription>
            Enter details about your race. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>
        
        <RaceForm 
          onSubmit={onSubmit}
          cars={cars}
          trackLayouts={trackLayouts}
          loading={loading}
        />
        
        <DialogFooter className="flex flex-row justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSaveClick}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Race"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddRaceDialog;
