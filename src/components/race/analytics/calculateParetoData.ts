
import { Race } from '../table/types';

export type ParetoData = {
  name: string;
  value: number;
  cumulative: number;
};

export function calculateParetoData(races: Race[]): ParetoData[] {
  // Group position improvements by track
  const improvementsByTrack: Record<string, number> = {};
  
  races.forEach(race => {
    if (race.track_layouts?.tracks?.name) {
      const trackName = race.track_layouts.tracks.name;
      // Calculate position improvement (start - finish). Positive = improved
      const improvement = race.start_position - race.finish_position;
      
      // Only count positive improvements
      if (improvement > 0) {
        improvementsByTrack[trackName] = (improvementsByTrack[trackName] || 0) + improvement;
      }
    }
  });
  
  // Convert to array and sort by improvement count (descending)
  const sortedData = Object.entries(improvementsByTrack)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  // If no data, return empty array
  if (sortedData.length === 0) {
    return [];
  }
  
  // Calculate cumulative values
  const totalImprovements = sortedData.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;
  
  return sortedData.map(item => {
    cumulative += item.value;
    return {
      ...item,
      cumulative: (cumulative / totalImprovements) * 100
    };
  });
}
