
export type Race = {
  id: string;
  race_date: string;
  cars?: { model: string; class?: string };
  track_layouts?: { 
    name: string;
    tracks?: { name: string };
  };
  start_position: number;
  finish_position: number;
  driver_rating_change: number;
  safety_rating_change: number;
  series?: string;
  notes?: string;
  car_id?: string;
  track_layout_id?: string;
  race_number?: number; // Added for display purposes only
};

export type SortField = 
  | 'race_number'
  | 'race_date'
  | 'car'
  | 'track'
  | 'series'
  | 'start_position'
  | 'finish_position'
  | 'driver_rating_change'
  | 'safety_rating_change';

export type SortDirection = 'asc' | 'desc';
