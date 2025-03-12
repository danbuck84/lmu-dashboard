
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileFormValues } from '../types';

export const useProfileData = (
  isAuthenticated: boolean,
  form: UseFormReturn<ProfileFormValues>
) => {
  const [profileData, setProfileData] = useState<any>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return;
      
      try {
        // Get the user's session
        const { data: sessionData } = await supabase.auth.getSession();
        const userUuid = sessionData.session?.user.id;
        
        if (!userUuid) {
          console.error('No user ID found in session');
          return;
        }
        
        console.log('Fetching profile for user:', userUuid);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userUuid)
          .single();
        
        if (error) {
          if (error.code === 'PGRST116') {
            console.log('No profile found, this could be normal for new users');
          } else {
            throw error;
          }
        }
        
        console.log('Profile data loaded:', data);
        
        if (data) {
          setProfileData(data);
          
          // Update form values with existing profile data
          form.reset({
            username: data.username || "",
            country: data.country_id || "", // Use country_id instead of country
            city: data.city || "",
            age: data.age || undefined,
            preferredCar: data.preferred_car_id || "",
            preferredTrack: data.preferred_track_id || "",
            bio: data.bio || "",
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [isAuthenticated, form]);

  return { profileData };
};
