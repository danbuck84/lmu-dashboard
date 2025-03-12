
import { Race } from '../table/types';
import { TrackUsageData } from './types';

export function calculateTrackUsage(races: Race[]): TrackUsageData[] {
  const trackCounts: Record<string, number> = {};
  
  races.forEach(race => {
    if (race.track_layouts?.tracks?.name) {
      const trackName = race.track_layouts.tracks.name;
      trackCounts[trackName] = (trackCounts[trackName] || 0) + 1;
    }
  });
  
  return Object.entries(trackCounts)
    .map(([name, races]) => ({ name, races }))
    .sort((a, b) => b.races - a.races);
}
