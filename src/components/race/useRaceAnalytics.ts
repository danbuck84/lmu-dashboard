
import { useMemo } from 'react';
import { Race } from './table/types';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';

// Types for the analytics data
export type RacesPerMonthData = {
  month: string;
  count: number;
  dateObj: Date;
};

export type PositionChangeData = {
  name: string;
  value: number;
};

export type CarUsageData = {
  name: string;
  races: number;
};

export type TrackUsageData = {
  name: string;
  races: number;
};

export type RatingChangesData = {
  month: string;
  dateObj: Date;
  driverRating: number;
  safetyRating: number;
};

export type RaceHistoryData = {
  raceId: number;
  date: string;
  dateObj: Date;
  startPosition: number;
  finishPosition: number;
};

export function useRaceAnalytics(races: Race[]) {
  // Sort races by date for chronological analysis
  const sortedRaces = useMemo(() => {
    return [...races].sort((a, b) => 
      new Date(a.race_date).getTime() - new Date(b.race_date).getTime()
    );
  }, [races]);

  // Analyze races per month
  const racesPerMonth = useMemo(() => {
    if (races.length === 0) return [];
    
    // Find the date range
    const dates = races.map(race => new Date(race.race_date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Ensure we include the full months
    const startMonth = startOfMonth(minDate);
    const endMonth = endOfMonth(maxDate);
    
    // Create an array of all months in the range
    const monthsRange = eachMonthOfInterval({ start: startMonth, end: endMonth });
    
    // Initialize data for all months
    const monthsData = monthsRange.map(date => ({
      month: format(date, 'MMM yyyy'),
      count: 0,
      dateObj: date
    }));
    
    // Count races per month
    races.forEach(race => {
      const raceDate = new Date(race.race_date);
      const monthKey = format(raceDate, 'MMM yyyy');
      const monthData = monthsData.find(data => data.month === monthKey);
      if (monthData) {
        monthData.count += 1;
      }
    });
    
    return monthsData;
  }, [races]);

  // Analyze position changes (improved, declined, same)
  const positionChanges = useMemo(() => {
    const improved = races.filter(race => race.finish_position < race.start_position).length;
    const declined = races.filter(race => race.finish_position > race.start_position).length;
    const same = races.filter(race => race.finish_position === race.start_position).length;
    
    return [
      { name: 'Improved', value: improved },
      { name: 'Declined', value: declined },
      { name: 'Same', value: same }
    ];
  }, [races]);

  // Analyze car usage
  const carUsage = useMemo(() => {
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
  }, [races]);

  // Analyze track usage
  const trackUsage = useMemo(() => {
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
  }, [races]);

  // Analyze rating changes over time
  const ratingChanges = useMemo(() => {
    if (sortedRaces.length === 0) return [];
    
    // Find the date range
    const dates = sortedRaces.map(race => new Date(race.race_date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Ensure we include the full months
    const startMonth = startOfMonth(minDate);
    const endMonth = endOfMonth(maxDate);
    
    // Create an array of all months in the range
    const monthsRange = eachMonthOfInterval({ start: startMonth, end: endMonth });
    
    // Initialize data structure
    const monthlyRatings = monthsRange.map(date => ({
      month: format(date, 'MMM yyyy'),
      dateObj: date,
      driverRating: 0,
      safetyRating: 0
    }));
    
    // Calculate cumulative rating changes per month
    sortedRaces.forEach(race => {
      const raceDate = new Date(race.race_date);
      const monthKey = format(raceDate, 'MMM yyyy');
      
      monthlyRatings.forEach(monthData => {
        if (monthData.month === monthKey) {
          monthData.driverRating += Number(race.driver_rating_change || 0);
          monthData.safetyRating += Number(race.safety_rating_change || 0);
        }
      });
    });
    
    // Convert to cumulative totals
    let cumulativeDR = 0;
    let cumulativeSR = 0;
    
    return monthlyRatings.map(month => {
      cumulativeDR += month.driverRating;
      cumulativeSR += month.safetyRating;
      
      return {
        ...month,
        driverRating: parseFloat(cumulativeDR.toFixed(2)),
        safetyRating: parseFloat(cumulativeSR.toFixed(2))
      };
    });
  }, [sortedRaces]);

  // Race history for positional changes
  const racePositionHistory = useMemo(() => {
    return sortedRaces.map((race, index) => ({
      raceId: index + 1,
      date: format(new Date(race.race_date), 'MMM d, yyyy'),
      dateObj: new Date(race.race_date),
      startPosition: race.start_position,
      finishPosition: race.finish_position
    }));
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
