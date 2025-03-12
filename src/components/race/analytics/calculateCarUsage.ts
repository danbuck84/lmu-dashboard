
import { Race } from '../table/types';
import { CarUsageData } from './types';

export function calculateCarUsage(races: Race[]): CarUsageData[] {
  const carCounts: Record<string, number> = {};
  
  races.forEach(race => {
    if (race.cars?.model) {
      const carName = race.cars.model;
      carCounts[carName] = (carCounts[carName] || 0) + 1;
    }
  });
  
  return Object.entries(carCounts)
    .map(([name, races]) => ({ name, races }))
    .sort((a, b) => b.races - a.races);
}
