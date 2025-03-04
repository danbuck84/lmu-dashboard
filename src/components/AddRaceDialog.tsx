
import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  car_id: z.string().min(1, { message: "Car is required" }),
  track_layout_id: z.string().min(1, { message: "Track and layout are required" }),
  start_position: z.coerce.number().int().min(1, { message: "Start position is required" }),
  finish_position: z.coerce.number().int().min(1, { message: "Finish position is required" }),
  driver_rating_change: z.coerce.number().int(),
  safety_rating_change: z.coerce.number().int(),
});

type AddRaceDialogProps = {
  onRaceAdded: (raceData: any) => void;
};

const AddRaceDialog = ({ onRaceAdded }: AddRaceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [trackLayouts, setTrackLayouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      car_id: "",
      track_layout_id: "",
      start_position: 0,
      finish_position: 0,
      driver_rating_change: 0,
      safety_rating_change: 0,
    },
  });

  // Fetch cars and track layouts when dialog opens
  useEffect(() => {
    if (open) {
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
  }, [open]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      
      // Get current user ID
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      
      if (!userId) {
        toast.error('User session not found');
        return;
      }
      
      // Insert race into database
      const { data, error } = await supabase
        .from('races')
        .insert({
          user_id: userId,
          race_date: new Date(values.date).toISOString(),
          car_id: values.car_id,
          track_layout_id: values.track_layout_id,
          start_position: values.start_position,
          finish_position: values.finish_position,
          driver_rating_change: values.driver_rating_change,
          safety_rating_change: values.safety_rating_change,
        })
        .select(`
          *,
          cars(model, class),
          track_layouts(name, track_id),
          track_layouts.tracks(name)
        `)
        .single();
        
      if (error) throw error;
      
      toast.success('Race added successfully!');
      onRaceAdded(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error adding race:", error);
      toast.error("Failed to add race");
    } finally {
      setLoading(false);
    }
  }

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
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="car_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select car" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car.id} value={car.id}>
                            {car.model} ({car.class})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="track_layout_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track & Layout *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select track and layout" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trackLayouts.map((layout) => (
                          <SelectItem key={layout.id} value={layout.id}>
                            {layout.tracks?.name} ({layout.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="start_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Position *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="finish_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Finish Position *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="driver_rating_change"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Rating Change</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="safety_rating_change"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Safety Rating Change</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Race"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRaceDialog;
