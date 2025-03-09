
export type FilterOptions = {
  carId?: string;
  trackLayoutId?: string;
  dateFrom?: string;
  dateTo?: string;
  positionChange?: 'improved' | 'declined' | 'same' | null;
};

export type Car = {
  id: string;
  model: string;
  class?: string;
};

export type TrackLayout = {
  id: string;
  name: string;
  tracks?: {
    name: string;
  };
};

export type RaceFiltersProps = {
  cars: Car[];
  trackLayouts: TrackLayout[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
};
