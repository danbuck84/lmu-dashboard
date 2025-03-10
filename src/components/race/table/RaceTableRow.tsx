
import React from 'react';
import { Button } from '@/components/ui/button';
import type { Race } from './types';

type RaceTableRowProps = {
  race: Race;
  onViewDetails: (race: Race) => void;
};

const RaceTableRow = ({ 
  race, 
  onViewDetails
}: RaceTableRowProps) => {
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-2 px-4">{new Date(race.race_date).toLocaleDateString()}</td>
      <td className="py-2 px-4">{race.cars?.model}</td>
      <td className="py-2 px-4">{race.track_layouts?.tracks?.name} ({race.track_layouts?.name})</td>
      <td className="py-2 px-4">{race.series || '-'}</td>
      <td className="py-2 px-4 text-center">{race.start_position}</td>
      <td className="py-2 px-4 text-center">{race.finish_position}</td>
      <td className="py-2 px-4 text-center">
        <span className={race.driver_rating_change > 0 ? 'text-green-500' : race.driver_rating_change < 0 ? 'text-red-500' : ''}>
          {race.driver_rating_change > 0 ? `+${Number(race.driver_rating_change).toFixed(2)}` : Number(race.driver_rating_change).toFixed(2)}
        </span>
      </td>
      <td className="py-2 px-4 text-center">
        <span className={race.safety_rating_change > 0 ? 'text-green-500' : race.safety_rating_change < 0 ? 'text-red-500' : ''}>
          {race.safety_rating_change > 0 ? `+${Number(race.safety_rating_change).toFixed(2)}` : Number(race.safety_rating_change).toFixed(2)}
        </span>
      </td>
      <td className="py-2 px-4 text-center">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onViewDetails(race)}
        >
          View
        </Button>
      </td>
    </tr>
  );
};

export default RaceTableRow;
