
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { RaceFormValues, raceFormSchema } from "./race-form-schema";

type Car = {
  id: string;
  model: string;
  class?: string;
};

type TrackLayout = {
  id: string;
  name: string;
  tracks?: {
    name: string;
  };
};

interface RaceFormProps {
  onSubmit: (values: RaceFormValues) => Promise<void>;
  cars: Car[];
  trackLayouts: TrackLayout[];
  loading: boolean;
  defaultValues?: Partial<RaceFormValues>;
}

const RaceForm = ({ onSubmit, cars, trackLayouts, loading, defaultValues }: RaceFormProps) => {
  const form = useForm<RaceFormValues>({
    resolver: zodResolver(raceFormSchema),
    defaultValues: defaultValues || {
      date: new Date().toISOString().split('T')[0],
      car_id: "",
      track_layout_id: "",
      start_position: 0,
      finish_position: 0,
      driver_rating_change: 0,
      safety_rating_change: 0,
    },
  });

  // Group cars by class
  const carsByClass = cars.reduce((acc: { [key: string]: Car[] }, car) => {
    const carClass = car.class || 'Other';
    if (!acc[carClass]) {
      acc[carClass] = [];
    }
    acc[carClass].push(car);
    return acc;
  }, {});

  // Sort track layouts alphabetically by track name and layout name
  const sortedTrackLayouts = [...trackLayouts].sort((a, b) => {
    const trackNameA = a.tracks?.name || '';
    const trackNameB = b.tracks?.name || '';
    
    if (trackNameA !== trackNameB) {
      return trackNameA.localeCompare(trackNameB);
    }
    
    return a.name.localeCompare(b.name);
  });

  return (
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
                    {Object.entries(carsByClass).map(([carClass, carsInClass]) => (
                      <React.Fragment key={carClass}>
                        <SelectItem value={`__group_${carClass}`} disabled className="font-semibold bg-muted">
                          {carClass}
                        </SelectItem>
                        {carsInClass.map((car) => (
                          <SelectItem key={car.id} value={car.id}>
                            {car.model}
                          </SelectItem>
                        ))}
                      </React.Fragment>
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
                    {sortedTrackLayouts.map((layout) => (
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
                  <Input type="number" step="0.01" {...field} />
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
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Race"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RaceForm;
