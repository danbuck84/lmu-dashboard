
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import RaceStatistics from '@/components/race/RaceStatistics';
import { Race } from '@/components/race/table/types';

type DashboardLayoutProps = {
  children: React.ReactNode;
  loading: boolean;
  races: Race[];
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  loading, 
  races 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-checkered-pattern bg-fixed bg-no-repeat bg-cover">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1 relative z-10">
        <h1 className="text-2xl font-bold mb-6">Racing Dashboard</h1>
        
        {loading ? (
          <Card className="p-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm">
            <p className="text-center py-4">Loading dashboard data...</p>
          </Card>
        ) : races.length === 0 ? (
          <Card className="p-6 bg-white/90 dark:bg-card/90 backdrop-blur-sm">
            <p className="text-muted-foreground text-center py-4">
              No race data available. Add races in your Race Log to see analytics here.
            </p>
          </Card>
        ) : (
          <>
            <RaceStatistics races={races} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
