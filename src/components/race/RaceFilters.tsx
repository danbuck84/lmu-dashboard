
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FilterX } from 'lucide-react';
import { RaceFiltersProps } from './filters/types';
import CarFilter from './filters/CarFilter';
import TrackFilter from './filters/TrackFilter';
import DateFilter from './filters/DateFilter';
import PositionChangeFilter from './filters/PositionChangeFilter';

export type { FilterOptions } from './filters/types';

const RaceFilters: React.FC<RaceFiltersProps> = ({
  cars,
  trackLayouts,
  filters,
  setFilters,
  clearFilters
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4">
          <CarFilter 
            cars={cars} 
            filters={filters} 
            setFilters={setFilters} 
          />

          <TrackFilter 
            trackLayouts={trackLayouts} 
            filters={filters} 
            setFilters={setFilters} 
          />

          <DateFilter 
            filters={filters} 
            setFilters={setFilters} 
          />

          <PositionChangeFilter 
            filters={filters} 
            setFilters={setFilters} 
          />

          <div className="w-full md:w-auto flex items-end">
            <Button 
              variant="outline" 
              onClick={clearFilters} 
              className="h-10 w-full md:w-auto"
            >
              <FilterX className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RaceFilters;
