
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { formSchema, ProfileFormValues } from './types';

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

export const useUserSettings = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  
  // Set up form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      country: "",
      city: "",
      age: undefined,
      preferredCar: "",
      preferredTrack: "",
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to access your settings');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data: Country[] = await response.json();
        
        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        toast.error('Failed to load countries data');
      }
    };

    // Fetch cars and tracks from Supabase
    const fetchReferenceData = async () => {
      try {
        // Fetch car and track data in parallel
        const [carsResponse, tracksResponse] = await Promise.all([
          supabase.from('cars').select('*').order('model'),
          supabase.from('tracks').select('*').order('name')
        ]);
        
        if (carsResponse.error) throw carsResponse.error;
        if (tracksResponse.error) throw tracksResponse.error;
        
        setCars(carsResponse.data || []);
        setTracks(tracksResponse.data || []);
      } catch (error) {
        console.error('Error fetching reference data:', error);
        toast.error('Failed to load reference data');
      }
    };

    if (isAuthenticated) {
      fetchCountries();
      fetchReferenceData();
    }
  }, [isAuthenticated]);

  // Fetch user profile
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
            country: data.country_id || "",
            city: data.city || "",
            age: data.age || undefined,
            preferredCar: data.preferred_car_id || "",
            preferredTrack: data.preferred_track_id || "",
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      }
    };

    fetchProfile();
  }, [isAuthenticated, form]);

  // Submit handler
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
        country_id: values.country || null,
        city: values.city || null,
        age: values.age || null,
        preferred_car_id: values.preferredCar || null,
        preferred_track_id: values.preferredTrack || null,
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
            country_id: values.country || null,
            city: values.city || null,
            age: values.age || null,
            preferred_car_id: values.preferredCar || null,
            preferred_track_id: values.preferredTrack || null,
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
            country_id: values.country || null,
            city: values.city || null,
            age: values.age || null,
            preferred_car_id: values.preferredCar || null,
            preferred_track_id: values.preferredTrack || null,
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

  return {
    form,
    isSubmitting,
    cars,
    countries,
    tracks,
    onSubmit,
    isAuthenticated
  };
};
