
import React from 'react';
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UsernameField } from './UsernameField';
import { CountryField } from './CountryField';
import { CityField } from './CityField';
import { AgeField } from './AgeField';
import { PreferredCarField } from './PreferredCarField';
import { PreferredTrackField } from './PreferredTrackField';
import { ProfileFormValues } from './types';
import { UseFormReturn } from 'react-hook-form';

interface UserSettingsFormProps {
  form: UseFormReturn<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  isSubmitting: boolean;
  cars: any[];
  countries: any[];
  tracks: any[];
}

export const UserSettingsForm = ({
  form,
  onSubmit,
  isSubmitting,
  cars,
  countries,
  tracks
}: UserSettingsFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <UsernameField control={form.control} />
          
          <div className="grid grid-cols-2 gap-4">
            <CountryField control={form.control} countries={countries} />
            <CityField control={form.control} />
          </div>
          
          <AgeField control={form.control} />
          
          <div className="grid grid-cols-2 gap-4">
            <PreferredCarField control={form.control} cars={cars} />
            <PreferredTrackField control={form.control} tracks={tracks} />
          </div>
        </div>
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
};
