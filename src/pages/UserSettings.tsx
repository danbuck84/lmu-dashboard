
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserSettings } from '@/components/user-settings/useUserSettings';
import { UserSettingsForm } from '@/components/user-settings/UserSettingsForm';
import Navigation from '@/components/Navigation';

const UserSettings = () => {
  const {
    form,
    isSubmitting,
    cars,
    countries,
    tracks,
    onSubmit,
    isAuthenticated
  } = useUserSettings();

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
            <UserSettingsForm
              form={form}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              cars={cars}
              countries={countries}
              tracks={tracks}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;
