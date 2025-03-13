
import { Race } from '../table/types';
import { RaceHistoryData } from './types';
import { format } from 'date-fns';

export function calculateRacePositionHistory(sortedRaces: Race[]): RaceHistoryData[] {
  // Make a new copy of the races and sort them by ID
  const idSortedRaces = [...sortedRaces].sort(
    (a, b) => {
      // Extract numerical ID from string ID (assuming format like "uuid" or similar)
      // If ID is not a simple number, we can use the initial ordering
      const idA = a.id;
      const idB = b.id;
      return idA.localeCompare(idB);
    }
  );
  
  // Map the sorted races to the correct data format with sequential raceId values
  // This ensures that the very first race by ID has display ID #1, second race has display ID #2, etc.
  return idSortedRaces.map((race, index) => ({
    raceId: index + 1, // Ensures sequential numbering starting from 1
    date: format(new Date(race.race_date), 'MMM d, yyyy'),
    dateObj: new Date(race.race_date),
    startPosition: race.start_position,
    finishPosition: race.finish_position
  }));
}
