
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ProfileFormValues } from './types';

interface PreferredCarFieldProps {
  control: Control<ProfileFormValues>;
  cars: any[];
}

export const PreferredCarField = ({ control, cars }: PreferredCarFieldProps) => (
  <FormField
    control={control}
    name="preferredCar"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Preferred Car</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a car" />
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
);
