
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
import { Country } from './hooks/useCountryData';

interface CountryFieldProps {
  control: Control<ProfileFormValues>;
  countries: Country[];
}

export const CountryField = ({ control, countries }: CountryFieldProps) => (
  <FormField
    control={control}
    name="country"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Country</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value || ""}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="max-h-[300px]">
            {countries.map((country) => (
              <SelectItem key={country.name.common} value={country.name.common}>
                {country.name.common}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
