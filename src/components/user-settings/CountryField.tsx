
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

interface Country {
  name: {
    common: string;
  };
  cca2: string;
  flags: {
    svg: string;
    png: string;
  };
}

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
          value={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="max-h-[300px]">
            {countries.map((country) => (
              <SelectItem key={country.cca2} value={country.cca2} className="flex items-center gap-2">
                {country.flags && (
                  <span className="inline-block w-5 h-3 mr-2 align-middle">
                    <img 
                      src={country.flags.svg || country.flags.png} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  </span>
                )}
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
