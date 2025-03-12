
import { Race } from '../table/types';
import { RacesPerMonthData } from './types';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';

export function calculateRacesPerMonth(races: Race[]): RacesPerMonthData[] {
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
}
