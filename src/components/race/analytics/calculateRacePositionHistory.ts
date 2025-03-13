
import { Race } from '../table/types';
import { RaceHistoryData } from './types';
import { format } from 'date-fns';

export function calculateRacePositionHistory(sortedRaces: Race[]): RaceHistoryData[] {
  // Make a new copy of the races and sort them by date
  const chronologicalRaces = [...sortedRaces].sort(
    (a, b) => new Date(a.race_date).getTime() - new Date(b.race_date).getTime()
  );
  
  // Map the sorted races to the correct data format with sequential raceId values
  return chronologicalRaces.map((race, index) => ({
    raceId: index + 1,
    date: format(new Date(race.race_date), 'MMM d, yyyy'),
    dateObj: new Date(race.race_date),
    startPosition: race.start_position,
    finishPosition: race.finish_position
  }));
}
