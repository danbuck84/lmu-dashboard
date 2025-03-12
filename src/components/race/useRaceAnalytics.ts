
import { useMemo } from 'react';
import { Race } from './table/types';
import { calculateRacesPerMonth } from './analytics/calculateRacesPerMonth';
import { calculatePositionChanges } from './analytics/calculatePositionChanges';
import { calculateCarUsage } from './analytics/calculateCarUsage';
import { calculateTrackUsage } from './analytics/calculateTrackUsage';
import { calculateRatingChanges } from './analytics/calculateRatingChanges';
import { calculateRacePositionHistory } from './analytics/calculateRacePositionHistory';

// Re-export types from the analytics modules
export type { 
  RacesPerMonthData,
  PositionChangeData,
  CarUsageData,
  TrackUsageData,
  RatingChangesData,
  RaceHistoryData
} from './analytics/types';

export function useRaceAnalytics(races: Race[]) {
  // Sort races by date for chronological analysis
  const sortedRaces = useMemo(() => {
    return [...races].sort((a, b) => 
      new Date(a.race_date).getTime() - new Date(b.race_date).getTime()
    );
  }, [races]);

  // Analyze races per month
  const racesPerMonth = useMemo(() => {
    return calculateRacesPerMonth(races);
  }, [races]);

  // Analyze position changes (improved, declined, same)
  const positionChanges = useMemo(() => {
    return calculatePositionChanges(races);
  }, [races]);

  // Analyze car usage
  const carUsage = useMemo(() => {
    return calculateCarUsage(races);
  }, [races]);

  // Analyze track usage
  const trackUsage = useMemo(() => {
    return calculateTrackUsage(races);
  }, [races]);

  // Analyze rating changes over time
  const ratingChanges = useMemo(() => {
    return calculateRatingChanges(sortedRaces);
  }, [sortedRaces]);

  // Race history for positional changes
  const racePositionHistory = useMemo(() => {
    return calculateRacePositionHistory(sortedRaces);
  }, [sortedRaces]);

  return {
    racesPerMonth,
    positionChanges,
    carUsage,
    trackUsage,
    ratingChanges,
    racePositionHistory
  };
}
