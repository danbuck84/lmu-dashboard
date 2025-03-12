
import { Race } from '../table/types';
import { PositionChangeData } from './types';

export function calculatePositionChanges(races: Race[]): PositionChangeData[] {
  const improved = races.filter(race => race.finish_position < race.start_position).length;
  const declined = races.filter(race => race.finish_position > race.start_position).length;
  const same = races.filter(race => race.finish_position === race.start_position).length;
  
  return [
    { name: 'Improved', value: improved },
    { name: 'Declined', value: declined },
    { name: 'Same', value: same }
  ];
}
