
import { Race } from '../table/types';
import { RaceHistoryData } from './types';
import { format } from 'date-fns';

export function calculateRacePositionHistory(sortedRaces: Race[]): RaceHistoryData[] {
  return sortedRaces.map((race, index) => ({
    raceId: index + 1,
    date: format(new Date(race.race_date), 'MMM d, yyyy'),
    dateObj: new Date(race.race_date),
    startPosition: race.start_position,
    finishPosition: race.finish_position
  }));
}
