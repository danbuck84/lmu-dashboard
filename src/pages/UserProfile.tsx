
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, MapPin, Trophy, Flag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [raceStats, setRaceStats] = useState({
    totalRaces: 0,
    wins: 0,
    podiums: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            *,
            cars:preferred_car_id(id, model, class),
            tracks:preferred_track_id(id, name)
          `)
          .eq('id', userId)
          .single();

        if (profileError) throw profileError;
        
        if (profileData) {
          setProfile(profileData);
          
          // Fetch race statistics
          const { data: races, error: racesError } = await supabase
            .from('races')
            .select('finish_position')
            .eq('user_id', userId);
            
          if (racesError) throw racesError;
          
          if (races) {
            const totalRaces = races.length;
            const wins = races.filter(race => race.finish_position === 1).length;
            const podiums = races.filter(race => race.finish_position <= 3).length;
            
            setRaceStats({
              totalRaces,
              wins,
              podiums
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container mx-auto py-8 flex-1 flex items-center justify-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="container mx-auto py-8 flex-1">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center">User not found</p>
              <div className="mt-4 flex justify-center">
                <Button asChild variant="outline">
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1">
        <div className="mb-4">
          <Button asChild variant="outline">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">
                    {profile.username ? profile.username.substring(0, 2).toUpperCase() : 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{profile.username}</CardTitle>
                  {profile.country && (
                    <div className="flex items-center text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profile.country}
                      {profile.city && `, ${profile.city}`}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {profile.bio ? (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Bio</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{profile.bio}</p>
                </div>
              ) : (
                <p className="text-muted-foreground italic mb-6">This user hasn't added a bio yet.</p>
              )}
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferred Car</h3>
                  {profile.cars ? (
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      <span>{profile.cars.model} ({profile.cars.class})</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">Not specified</p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Preferred Track</h3>
                  {profile.tracks ? (
                    <div className="flex items-center gap-2">
                      <Flag className="h-5 w-5 text-primary" />
                      <span>{profile.tracks.name}</span>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">Not specified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Racing Statistics</CardTitle>
              <CardDescription>Performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Races</span>
                  <span className="font-medium text-lg">{raceStats.totalRaces}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="text-muted-foreground">Wins</span>
                  </div>
                  <span className="font-medium text-lg">{raceStats.wins}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-slate-400" />
                    <span className="text-muted-foreground">Podiums</span>
                  </div>
                  <span className="font-medium text-lg">{raceStats.podiums}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Win Rate</span>
                  <span className="font-medium text-lg">
                    {raceStats.totalRaces > 0 
                      ? `${Math.round((raceStats.wins / raceStats.totalRaces) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Podium Rate</span>
                  <span className="font-medium text-lg">
                    {raceStats.totalRaces > 0 
                      ? `${Math.round((raceStats.podiums / raceStats.totalRaces) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
