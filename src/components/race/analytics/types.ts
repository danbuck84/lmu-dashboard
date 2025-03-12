
// Common types for race analytics
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
