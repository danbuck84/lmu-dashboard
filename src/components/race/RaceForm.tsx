
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RaceFormValues, raceFormSchema } from "./race-form-schema";
import { DateField, CarField, TrackField, PositionFields, RatingFields } from "./FormFields";

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
        <DateField control={form.control} />
        
        <div className="grid grid-cols-2 gap-4">
          <CarField control={form.control} carsByClass={carsByClass} />
          <TrackField control={form.control} sortedTrackLayouts={sortedTrackLayouts} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <PositionFields control={form.control} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <RatingFields control={form.control} />
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
