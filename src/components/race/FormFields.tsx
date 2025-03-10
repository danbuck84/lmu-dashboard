
import React from "react";
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RaceFormInputValues } from "./race-form-schema";
import { AlertTriangle, FileText, Flag } from "lucide-react";

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

export const DateField = ({ control }: { control: Control<RaceFormInputValues> }) => (
  <FormField
    control={control}
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
);

export const CarField = ({ control, carsByClass }: { control: Control<RaceFormInputValues>, carsByClass: { [key: string]: Car[] } }) => (
  <FormField
    control={control}
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
);

export const TrackField = ({ control, sortedTrackLayouts }: { control: Control<RaceFormInputValues>, sortedTrackLayouts: TrackLayout[] }) => (
  <FormField
    control={control}
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
);

export const PositionFields = ({ control }: { control: Control<RaceFormInputValues> }) => (
  <>
    <FormField
      control={control}
      name="qualifying_position"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            <Flag className="h-4 w-4" />
            Qualifying Position
          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="Optional" {...field} value={field.value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
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
      control={control}
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
  </>
);

export const RatingFields = ({ control }: { control: Control<RaceFormInputValues> }) => (
  <>
    <FormField
      control={control}
      name="driver_rating_change"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Driver Rating Change</FormLabel>
          <FormControl>
            <Input placeholder="0.00" {...field} />
          </FormControl>
          <FormDescription>
            Use dot (.) for decimal places, e.g., 8.40
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="safety_rating_change"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Safety Rating Change</FormLabel>
          <FormControl>
            <Input placeholder="0.00" {...field} />
          </FormControl>
          <FormDescription>
            Use dot (.) for decimal places, e.g., 8.40
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

export const AdditionalFields = ({ control }: { control: Control<RaceFormInputValues> }) => (
  <>
    <FormField
      control={control}
      name="incidents"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Incidents
          </FormLabel>
          <FormControl>
            <Input type="number" placeholder="Optional" {...field} value={field.value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Notes
          </FormLabel>
          <FormControl>
            <Textarea placeholder="Optional notes about the race" {...field} value={field.value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
