
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Trophy, Car, Calendar } from 'lucide-react';

type StatisticCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
};

const StatisticCard: React.FC<StatisticCardProps> = ({ title, value, icon, description }) => (
  <Card className="flex-1 min-w-[180px]">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-md font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

type RaceStatisticsProps = {
  races: any[];
};

const RaceStatistics: React.FC<RaceStatisticsProps> = ({ races }) => {
  // Calculate total races
  const totalRaces = races.length;
  
  // Calculate wins and podiums (1st to 3rd)
  const wins = races.filter(race => race.finish_position === 1).length;
  const podiums = races.filter(race => race.finish_position <= 3).length;
  
  // Calculate position improvements and declines
  const positionImprovements = races.filter(
    race => race.finish_position < race.start_position
  ).length;
  
  const positionDeclines = races.filter(
    race => race.finish_position > race.start_position
  ).length;
  
  // Calculate driver and safety rating changes
  const totalDrChange = races.reduce(
    (sum, race) => sum + (parseFloat(race.driver_rating_change || 0)), 
    0
  );
  
  const totalSrChange = races.reduce(
    (sum, race) => sum + (parseFloat(race.safety_rating_change || 0)), 
    0
  );
  
  // Calculate most raced car
  const carCounts = races.reduce((acc: {[key: string]: number}, race) => {
    if (race.cars?.model) {
      acc[race.cars.model] = (acc[race.cars.model] || 0) + 1;
    }
    return acc;
  }, {});
  
  const mostRacedCar = Object.entries(carCounts).reduce(
    (most, [car, count]) => count > most.count ? { car, count } : most, 
    { car: 'None', count: 0 }
  );
  
  // Calculate most raced track
  const trackCounts = races.reduce((acc: {[key: string]: number}, race) => {
    if (race.track_layouts?.tracks?.name) {
      const trackName = race.track_layouts.tracks.name;
      acc[trackName] = (acc[trackName] || 0) + 1;
    }
    return acc;
  }, {});
  
  const mostRacedTrack = Object.entries(trackCounts).reduce(
    (most, [track, count]) => count > most.count ? { track, count } : most, 
    { track: 'None', count: 0 }
  );

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Races"
          value={totalRaces}
          icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
        />
        
        <StatisticCard
          title="Wins / Podiums"
          value={`${wins} / ${podiums}`}
          icon={<Trophy className="h-5 w-5 text-yellow-500" />}
          description={`${((podiums / totalRaces) * 100).toFixed(0)}% podium rate`}
        />
        
        <StatisticCard
          title="Position Changes"
          value={`+${positionImprovements} / -${positionDeclines}`}
          icon={
            positionImprovements >= positionDeclines 
              ? <TrendingUp className="h-5 w-5 text-green-500" />
              : <TrendingDown className="h-5 w-5 text-red-500" />
          }
          description="Improved / Declined positions"
        />
        
        <StatisticCard
          title="Rating Changes"
          value={`DR: ${totalDrChange > 0 ? '+' : ''}${totalDrChange.toFixed(2)} / SR: ${totalSrChange > 0 ? '+' : ''}${totalSrChange.toFixed(2)}`}
          icon={
            totalDrChange + totalSrChange >= 0 
              ? <TrendingUp className="h-5 w-5 text-green-500" />
              : <TrendingDown className="h-5 w-5 text-red-500" />
          }
          description="Driver / Safety rating changes"
        />
        
        <StatisticCard
          title="Most Used Car"
          value={mostRacedCar.car}
          icon={<Car className="h-5 w-5 text-muted-foreground" />}
          description={`Used in ${mostRacedCar.count} races`}
        />
        
        <StatisticCard
          title="Favorite Track"
          value={mostRacedTrack.track}
          icon={<Trophy className="h-5 w-5 text-muted-foreground" />}
          description={`Raced ${mostRacedTrack.count} times`}
        />
      </div>
    </div>
  );
};

export default RaceStatistics;
