import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';

// Define the form schema with Zod
const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  country: z.string().optional(),
  city: z.string().optional(),
  age: z.coerce.number().min(13).max(120).optional(),
  preferredCar: z.string().optional(),
  preferredTrack: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

// Extract form fields into separate components for better readability
const UsernameField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const CountryField = ({ control, countries }: { control: any, countries: any[] }) => (
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
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

const CityField = ({ control }: { control: any }) => (
  <FormField
    control={control}
    name="city"
    render={({ field }) => (
      <FormItem>
        <FormLabel>City</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const AgeField = ({ control }: { control: any }) => (
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

const PreferredCarField = ({ control, cars }: { control: any, cars: any[] }) => (
  <FormField
    control={control}
    name="preferredCar"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Preferred Car</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a car" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {cars.map((car) => (
              <SelectItem key={car.id} value={car.id}>
                {car.model} ({car.class})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

const PreferredTrackField = ({ control, tracks }: { control: any, tracks: any[] }) => (
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

const UserSettings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cars, setCars] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
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

  // Fetch reference data (cars, countries, tracks)
  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        // Fetch all data in parallel
        const [carsResponse, countriesResponse, tracksResponse] = await Promise.all([
          supabase.from('cars').select('*').order('model'),
          supabase.from('countries').select('*').order('name'),
          supabase.from('tracks').select('*').order('name')
        ]);
        
        if (carsResponse.error) throw carsResponse.error;
        if (countriesResponse.error) throw countriesResponse.error;
        if (tracksResponse.error) throw tracksResponse.error;
        
        setCars(carsResponse.data || []);
        setCountries(countriesResponse.data || []);
        setTracks(tracksResponse.data || []);
      } catch (error) {
        console.error('Error fetching reference data:', error);
        toast.error('Failed to load reference data');
      }
    };

    if (isAuthenticated) {
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

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">User Settings</CardTitle>
            <CardDescription>
              Update your profile and Le Mans Ultimate preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
