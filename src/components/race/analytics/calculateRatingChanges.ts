
import { Race } from '../table/types';
import { RatingChangesData } from './types';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';

export function calculateRatingChanges(sortedRaces: Race[]): RatingChangesData[] {
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
}
