
import React, { useState } from 'react';
import { DashboardCard } from '@/components/DashboardCard';
import RaceLogTable, { RaceData } from '@/components/RaceLogTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Car, Clock, Filter, FlagTriangleRight, Plus } from 'lucide-react';
import { createColumnHelper } from '@tanstack/react-table';
import { toast } from 'sonner';

// Sample data
const sampleRaces: RaceData[] = [
  {
    id: 1,
    date: '2023-07-15',
    series: 'GT World Challenge',
    category: 'GT3',
    car: 'Porsche 911 GT3',
    track: 'Spa-Francorchamps',
    layout: 'GP Circuit',
    startPosition: 8,
    finishPosition: 3,
    drChange: 15,
    srChange: 5,
    bestLapTime: '2:18.543',
    sessionType: 'Race',
    laps: 24,
    fuelConsumption: 2.8,
    tyreDegradation: 0.07,
    incidents: 2,
    notes: 'Great race, made good progress through the field.'
  },
  {
    id: 2,
    date: '2023-07-10',
    series: 'GT World Challenge',
    category: 'GT3',
    car: 'Ferrari 488 GT3',
    track: 'Monza',
    layout: 'Grand Prix',
    startPosition: 5,
    finishPosition: 8,
    drChange: -5,
    srChange: -2,
    bestLapTime: '1:48.123',
    sessionType: 'Race',
    laps: 22,
    fuelConsumption: 3.1,
    tyreDegradation: 0.08,
    incidents: 4,
    notes: 'Struggled with pace, minor contact in T1.'
  },
  {
    id: 3,
    date: '2023-07-01',
    series: 'Le Mans Series',
    category: 'LMP2',
    car: 'Oreca 07',
    track: 'Le Mans',
    layout: 'Circuit de la Sarthe',
    startPosition: 2,
    finishPosition: 1,
    drChange: 25,
    srChange: 10,
    bestLapTime: '3:32.789',
    sessionType: 'Race',
    laps: 30,
    fuelConsumption: 4.2,
    tyreDegradation: 0.06,
    incidents: 0,
    notes: 'Perfect race, consistent pace throughout.'
  },
  {
    id: 4,
    date: '2023-06-22',
    series: 'Endurance Cup',
    category: 'GT3',
    car: 'Audi R8 LMS',
    track: 'Nürburgring',
    layout: 'GP Circuit',
    startPosition: 12,
    finishPosition: 9,
    drChange: 5,
    srChange: 0,
    bestLapTime: '1:56.432',
    sessionType: 'Race',
    laps: 40,
    fuelConsumption: 2.9,
    tyreDegradation: 0.09,
    incidents: 1,
    notes: 'Long race, maintained position despite tire issues.'
  },
  {
    id: 5,
    date: '2023-06-15',
    series: 'Sprint Cup',
    category: 'GT4',
    car: 'BMW M4 GT4',
    track: 'Brands Hatch',
    layout: 'Grand Prix',
    startPosition: 4,
    finishPosition: 2,
    drChange: 18,
    srChange: 7,
    bestLapTime: '1:31.876',
    sessionType: 'Race',
    laps: 28,
    fuelConsumption: 2.2,
    tyreDegradation: 0.05,
    incidents: 0,
    notes: 'Great battle for the lead in the final laps.'
  },
];

// Car options
const carOptions = [
  { value: 'porsche_911_gt3', label: 'Porsche 911 GT3' },
  { value: 'ferrari_488_gt3', label: 'Ferrari 488 GT3' },
  { value: 'audi_r8_lms', label: 'Audi R8 LMS' },
  { value: 'bmw_m4_gt4', label: 'BMW M4 GT4' },
  { value: 'oreca_07', label: 'Oreca 07 LMP2' },
];

// Track options
const trackOptions = [
  { value: 'spa', label: 'Spa-Francorchamps' },
  { value: 'monza', label: 'Monza' },
  { value: 'le_mans', label: 'Le Mans' },
  { value: 'nurburgring', label: 'Nürburgring' },
  { value: 'brands_hatch', label: 'Brands Hatch' },
];

// Form schema
const formSchema = z.object({
  date: z.string().min(1, { message: 'Date is required' }),
  series: z.string().min(1, { message: 'Series is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  car: z.string().min(1, { message: 'Car is required' }),
  track: z.string().min(1, { message: 'Track is required' }),
  layout: z.string().min(1, { message: 'Layout is required' }),
  startPosition: z.string().min(1, { message: 'Start position is required' }),
  finishPosition: z.string().min(1, { message: 'Finish position is required' }),
  drChange: z.string(),
  srChange: z.string(),
  bestLapTime: z.string(),
  sessionType: z.string(),
  laps: z.string(),
  fuelConsumption: z.string(),
  tyreDegradation: z.string(),
  incidents: z.string(),
  notes: z.string(),
});

const RaceLog = () => {
  const [races, setRaces] = useState<RaceData[]>(sampleRaces);
  const [open, setOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      series: '',
      category: '',
      car: '',
      track: '',
      layout: '',
      startPosition: '',
      finishPosition: '',
      drChange: '0',
      srChange: '0',
      bestLapTime: '',
      sessionType: 'Race',
      laps: '',
      fuelConsumption: '',
      tyreDegradation: '',
      incidents: '0',
      notes: '',
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newRace: RaceData = {
      id: races.length + 1,
      date: values.date,
      series: values.series,
      category: values.category,
      car: values.car,
      track: values.track,
      layout: values.layout,
      startPosition: parseInt(values.startPosition),
      finishPosition: parseInt(values.finishPosition),
      drChange: parseInt(values.drChange),
      srChange: parseInt(values.srChange),
      bestLapTime: values.bestLapTime,
      sessionType: values.sessionType,
      laps: parseInt(values.laps),
      fuelConsumption: parseFloat(values.fuelConsumption),
      tyreDegradation: parseFloat(values.tyreDegradation),
      incidents: parseInt(values.incidents),
      notes: values.notes,
    };
    
    setRaces([newRace, ...races]);
    setOpen(false);
    form.reset();
    
    toast.success('Race Added', {
      description: `Added new race at ${values.track}`,
    });
  };
  
  // Create column definitions
  const columnHelper = createColumnHelper<RaceData>();
  
  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: info => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor('track', {
      header: 'Track',
    }),
    columnHelper.accessor('car', {
      header: 'Car',
    }),
    columnHelper.accessor('startPosition', {
      header: 'Start',
    }),
    columnHelper.accessor('finishPosition', {
      header: 'Finish',
      cell: info => {
        const value = info.getValue();
        const startPos = info.row.original.startPosition;
        const diff = startPos - value;
        
        return (
          <div className="flex items-center">
            <span>{value}</span>
            {diff !== 0 && (
              <span className={`ml-1.5 text-xs ${diff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {diff > 0 ? `+${diff}` : diff}
              </span>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('bestLapTime', {
      header: 'Best Lap',
    }),
    columnHelper.accessor('drChange', {
      header: 'DR',
      cell: info => {
        const value = info.getValue();
        return (
          <span className={value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''}>
            {value > 0 ? `+${value}` : value}
          </span>
        );
      },
    }),
    columnHelper.accessor('srChange', {
      header: 'SR',
      cell: info => {
        const value = info.getValue();
        return (
          <span className={value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : ''}>
            {value > 0 ? `+${value}` : value}
          </span>
        );
      },
    }),
    columnHelper.accessor('incidents', {
      header: 'Inc.',
    }),
    columnHelper.accessor('actions', {
      header: '',
      cell: () => (
        <Button variant="ghost" size="sm">
          View
        </Button>
      ),
    }),
  ];
  
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Race Log</h1>
            <p className="text-slate-500">Track and manage your races</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-racing-red hover:bg-racing-red/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Race
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Race</DialogTitle>
                <DialogDescription>
                  Enter the details of your race to add it to your log.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="series"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Series</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., GT World Challenge" {...field} />
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
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="GT3">GT3</SelectItem>
                              <SelectItem value="GT4">GT4</SelectItem>
                              <SelectItem value="LMP2">LMP2</SelectItem>
                              <SelectItem value="LMP3">LMP3</SelectItem>
                              <SelectItem value="Hypercar">Hypercar</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="car"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select car" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {carOptions.map(car => (
                                <SelectItem key={car.value} value={car.label}>
                                  {car.label}
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
                      name="track"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Track</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select track" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {trackOptions.map(track => (
                                <SelectItem key={track.value} value={track.label}>
                                  {track.label}
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
                      name="layout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Layout</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g., Grand Prix Circuit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Position</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
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
                          <FormLabel>Finish Position</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
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
                            <Input placeholder="E.g., 1:48.123" {...field} />
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
                          <FormLabel>Session Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select session type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Practice">Practice</SelectItem>
                              <SelectItem value="Qualifying">Qualifying</SelectItem>
                              <SelectItem value="Race">Race</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="laps"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Laps</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
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
                      name="fuelConsumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fuel Consumption (per lap)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tyreDegradation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tyre Degradation (per lap)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" min="0" max="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="incidents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Incidents</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional notes about the race..." 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Race
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-500">Quick Filters:</span>
              <Button variant="outline" size="sm" className="flex items-center">
                <Car className="h-3.5 w-3.5 mr-1" />
                Car
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <FlagTriangleRight className="h-3.5 w-3.5 mr-1" />
                Track
              </Button>
              <Button variant="outline" size="sm" className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Recent
              </Button>
            </div>
            <Button variant="outline" size="sm" className="flex items-center self-end md:self-auto">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Advanced Filters
            </Button>
          </div>
        </div>
        
        <DashboardCard className="animate-scale-in">
          <RaceLogTable data={races} columns={columns} />
        </DashboardCard>
      </div>
    </div>
  );
};

export default RaceLog;
