
import React from 'react';
import { Button } from '@/components/ui/button';

type Race = {
  id: string;
  race_date: string;
  cars?: { model: string };
  track_layouts?: { 
    name: string;
    tracks?: { name: string };
  };
  start_position: number;
  finish_position: number;
  driver_rating_change: number;
  safety_rating_change: number;
};

type RaceTableProps = {
  races: Race[];
  loading: boolean;
};

const RaceTable = ({ races, loading }: RaceTableProps) => {
  if (loading) {
    return <p className="text-center py-4">Loading races...</p>;
  }
  
  if (races.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No races match the selected filters.</p>;
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Car</th>
            <th className="py-2 px-4 text-left">Track</th>
            <th className="py-2 px-4 text-center">Start</th>
            <th className="py-2 px-4 text-center">Finish</th>
            <th className="py-2 px-4 text-center">DR Change</th>
            <th className="py-2 px-4 text-center">SR Change</th>
            <th className="py-2 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.id} className="border-b hover:bg-muted/50">
              <td className="py-2 px-4">{new Date(race.race_date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{race.cars?.model}</td>
              <td className="py-2 px-4">{race.track_layouts?.tracks?.name} ({race.track_layouts?.name})</td>
              <td className="py-2 px-4 text-center">{race.start_position}</td>
              <td className="py-2 px-4 text-center">{race.finish_position}</td>
              <td className="py-2 px-4 text-center">
                <span className={race.driver_rating_change > 0 ? 'text-green-500' : race.driver_rating_change < 0 ? 'text-red-500' : ''}>
                  {race.driver_rating_change > 0 ? `+${race.driver_rating_change.toFixed(2)}` : race.driver_rating_change.toFixed(2)}
                </span>
              </td>
              <td className="py-2 px-4 text-center">
                <span className={race.safety_rating_change > 0 ? 'text-green-500' : race.safety_rating_change < 0 ? 'text-red-500' : ''}>
                  {race.safety_rating_change > 0 ? `+${race.safety_rating_change.toFixed(2)}` : race.safety_rating_change.toFixed(2)}
                </span>
              </td>
              <td className="py-2 px-4 text-center">
                <Button variant="ghost" size="sm">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RaceTable;
