
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
  incidents?: number;
  notes?: string;
  qualifying_position?: number;
  car_id?: string;
  track_layout_id?: string;
};
