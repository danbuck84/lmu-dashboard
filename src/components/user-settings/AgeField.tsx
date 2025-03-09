
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ProfileFormValues } from './types';

interface AgeFieldProps {
  control: Control<ProfileFormValues>;
}

export const AgeField = ({ control }: AgeFieldProps) => (
  <FormField
    control={control}
    name="age"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Age</FormLabel>
        <FormControl>
          <Input type="number" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
