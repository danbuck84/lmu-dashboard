
import { Race } from '../table/types';

export type ParetoData = {
  name: string;
  value: number;
  cumulative: number;
};

export function calculateParetoData(races: Race[]): ParetoData[] {
  // Group incidents by track
  const incidentsByTrack: Record<string, number> = {};
  
  races.forEach(race => {
    if (race.incidents !== undefined && race.track_layouts?.tracks?.name) {
      const trackName = race.track_layouts.tracks.name;
      incidentsByTrack[trackName] = (incidentsByTrack[trackName] || 0) + race.incidents;
    }
  });
  
  // Convert to array and sort by incident count (descending)
  const sortedData = Object.entries(incidentsByTrack)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
  
  // If no data, return empty array
  if (sortedData.length === 0) {
    return [];
  }
  
  // Calculate cumulative values
  const totalIncidents = sortedData.reduce((sum, item) => sum + item.value, 0);
  let cumulative = 0;
  
  return sortedData.map(item => {
    cumulative += item.value;
    return {
      ...item,
      cumulative: (cumulative / totalIncidents) * 100
    };
  });
}
