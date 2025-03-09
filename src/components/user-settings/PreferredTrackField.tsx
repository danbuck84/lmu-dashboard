
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

interface PreferredTrackFieldProps {
  control: Control<ProfileFormValues>;
  tracks: any[];
}

export const PreferredTrackField = ({ control, tracks }: PreferredTrackFieldProps) => (
  <FormField
    control={control}
    name="preferredTrack"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Preferred Track</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a track" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {tracks.map((track) => (
              <SelectItem key={track.id} value={track.id}>
                {track.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
