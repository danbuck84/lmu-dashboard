
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from '@/contexts/AuthContext';
import { formSchema, ProfileFormValues } from './types';
import { useCountryData } from './hooks/useCountryData';
import { useReferenceData } from './hooks/useReferenceData';
import { useProfileData } from './hooks/useProfileData';
import { useProfileSubmit } from './hooks/useProfileSubmit';
import { useRedirectIfNotAuth } from './hooks/useRedirectIfNotAuth';

export const useUserSettings = () => {
  const { isAuthenticated } = useAuth();
  
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

  // Handle redirect if not authenticated
  useRedirectIfNotAuth(isAuthenticated);
  
  // Fetch countries
  const { countries } = useCountryData();
  
  // Fetch cars and tracks
  const { cars, tracks } = useReferenceData(isAuthenticated);
  
  // Fetch user profile
  useProfileData(isAuthenticated, form);
  
  // Handle form submission
  const { isSubmitting, onSubmit } = useProfileSubmit();

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
