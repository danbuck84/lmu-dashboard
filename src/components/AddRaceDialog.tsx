
import { useState } from 'react';
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

// Sample data - in a real app this would come from a database
const cars = ["Porsche 911 GT3", "BMW M4 GT3", "Ferrari 296 GT3", "Toyota GR010"];
const tracks = ["Le Mans", "Spa", "Monza", "Nürburgring"];
const layouts = ["Full Circuit", "Bugatti Circuit", "GP Layout"];
const sessionTypes = ["Practice", "Qualifying", "Race"];

const formSchema = z.object({
  date: z.string().min(1, { message: "Date is required" }),
  series: z.string().min(1, { message: "Series is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  car: z.string().min(1, { message: "Car is required" }),
  track: z.string().min(1, { message: "Track is required" }),
  layout: z.string().min(1, { message: "Layout is required" }),
  startPosition: z.coerce.number().int().min(1, { message: "Start position is required" }),
  finishPosition: z.coerce.number().int().min(1, { message: "Finish position is required" }),
  drChange: z.coerce.number().int(),
  srChange: z.coerce.number().int(),
  bestLapTime: z.string(),
  sessionType: z.string(),
  laps: z.coerce.number().int().min(1, { message: "Number of laps is required" }),
  fuelConsumption: z.coerce.number().optional(),
  tyreDegrad: z.coerce.number().optional(),
  incidents: z.coerce.number().int().default(0),
  notes: z.string().optional(),
});

type AddRaceDialogProps = {
  onRaceAdded: (raceData: any) => void;
};

const AddRaceDialog = ({ onRaceAdded }: AddRaceDialogProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      series: "",
      category: "",
      car: "",
      track: "",
      layout: "",
      startPosition: 0,
      finishPosition: 0,
      drChange: 0,
      srChange: 0,
      bestLapTime: "",
      sessionType: "Race",
      laps: 0,
      fuelConsumption: 0,
      tyreDegrad: 0,
      incidents: 0,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would be an API call to save the race data
    const newRace = {
      ...values,
      id: Date.now(), // Generate a simple id
      carTrackCombo: `${values.car} @ ${values.track} (${values.layout})`,
    };
    
    // Save to localStorage for demo purposes
    const races = JSON.parse(localStorage.getItem('races') || '[]');
    races.push(newRace);
    localStorage.setItem('races', JSON.stringify(races));
    
    onRaceAdded(newRace);
    toast.success('Race added successfully!');
    setOpen(false);
    form.reset();
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
            <div className="grid grid-cols-2 gap-4">
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
              
              <FormField
                control={form.control}
                name="sessionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sessionTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
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
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. GT World Challenge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. GT3, GTE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="car"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select car" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cars.map((car) => (
                          <SelectItem key={car} value={car}>{car}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="track"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Track *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select track" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tracks.map((track) => (
                          <SelectItem key={track} value={track}>{track}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="layout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Layout *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {layouts.map((layout) => (
                          <SelectItem key={layout} value={layout}>{layout}</SelectItem>
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
                name="startPosition"
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
                name="finishPosition"
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
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="drChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DR Change</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="srChange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SR Change</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bestLapTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Lap Time</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 1:45.678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="laps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Laps *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fuelConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Consumption</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tyreDegrad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tyre Degradation</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="incidents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incidents</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Race</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRaceDialog;
