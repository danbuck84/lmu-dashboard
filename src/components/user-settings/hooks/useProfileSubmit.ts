
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileFormValues } from '../types';

export const useProfileSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const onSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Get the user's session
      const { data: sessionData } = await supabase.auth.getSession();
      const userUuid = sessionData.session?.user.id;
      
      if (!userUuid) {
        toast.error('User session not found');
        return;
      }

      console.log('Saving profile data:', {
        username: values.username,
        country: values.country || null,
        city: values.city || null,
        age: values.age || null,
        preferred_car_id: values.preferredCar || null,
        preferred_track_id: values.preferredTrack || null,
        bio: values.bio || null,
      });

      // Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userUuid)
        .single();

      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update({
            username: values.username,
            country: values.country || null,
            city: values.city || null,
            age: values.age || null,
            preferred_car_id: values.preferredCar || null,
            preferred_track_id: values.preferredTrack || null,
            bio: values.bio || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userUuid);
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert({
            id: userUuid,
            username: values.username,
            country: values.country || null,
            city: values.city || null,
            age: values.age || null,
            preferred_car_id: values.preferredCar || null,
            preferred_track_id: values.preferredTrack || null,
            bio: values.bio || null,
            updated_at: new Date().toISOString(),
          });
      }

      if (result.error) throw result.error;
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, onSubmit };
};
