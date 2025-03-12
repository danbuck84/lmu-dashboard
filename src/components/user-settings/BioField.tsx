
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ProfileFormValues } from './types';

interface BioFieldProps {
  control: Control<ProfileFormValues>;
}

export const BioField = ({ control }: BioFieldProps) => (
  <FormField
    control={control}
    name="bio"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormDescription>
          Tell us a bit about yourself and your racing experience
        </FormDescription>
        <FormControl>
          <Textarea 
            placeholder="I'm a racing enthusiast who loves Le Mans..."
            className="resize-none min-h-[120px]"
            {...field} 
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
