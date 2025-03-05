
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { FilterX } from 'lucide-react';

export type FilterOptions = {
  carId?: string;
  trackLayoutId?: string;
  dateFrom?: string;
  dateTo?: string;
  positionChange?: 'improved' | 'declined' | 'same' | null;
};

type Car = {
  id: string;
  model: string;
  class?: string;
};

type TrackLayout = {
  id: string;
  name: string;
  tracks?: {
    name: string;
  };
};

type RaceFiltersProps = {
  cars: Car[];
  trackLayouts: TrackLayout[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  clearFilters: () => void;
};

const RaceFilters: React.FC<RaceFiltersProps> = ({
  cars,
  trackLayouts,
  filters,
  setFilters,
  clearFilters
}) => {
  // Group cars by class
  const carsByClass = cars.reduce((acc: { [key: string]: Car[] }, car) => {
    const carClass = car.class || 'Other';
    if (!acc[carClass]) {
      acc[carClass] = [];
    }
    acc[carClass].push(car);
    return acc;
  }, {});

  // Sort track layouts alphabetically by track name and layout name
  const sortedTrackLayouts = [...trackLayouts].sort((a, b) => {
    const trackNameA = a.tracks?.name || '';
    const trackNameB = b.tracks?.name || '';
    
    if (trackNameA !== trackNameB) {
      return trackNameA.localeCompare(trackNameB);
    }
    
    return a.name.localeCompare(b.name);
  });

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto flex-1 min-w-[180px]">
            <p className="text-sm font-medium mb-2">Car</p>
            <Select
              value={filters.carId || ''}
              onValueChange={(value) => setFilters({ ...filters, carId: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All cars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All cars</SelectItem>
                {Object.entries(carsByClass).map(([carClass, carsInClass]) => (
                  <React.Fragment key={carClass}>
                    <SelectItem value={`__group_${carClass}`} disabled className="font-semibold bg-muted">
                      {carClass}
                    </SelectItem>
                    {carsInClass.map((car) => (
                      <SelectItem key={car.id} value={car.id}>
                        {car.model}
                      </SelectItem>
                    ))}
                  </React.Fragment>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto flex-1 min-w-[180px]">
            <p className="text-sm font-medium mb-2">Track</p>
            <Select
              value={filters.trackLayoutId || ''}
              onValueChange={(value) => setFilters({ ...filters, trackLayoutId: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All tracks" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All tracks</SelectItem>
                {sortedTrackLayouts.map((layout) => (
                  <SelectItem key={layout.id} value={layout.id}>
                    {layout.tracks?.name} ({layout.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto min-w-[150px]">
            <p className="text-sm font-medium mb-2">Date range</p>
            <div className="flex gap-2">
              <Input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value || undefined })}
                className="flex-1"
              />
              <Input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value || undefined })}
                className="flex-1"
              />
            </div>
          </div>

          <div className="w-full md:w-auto flex-1 min-w-[180px]">
            <p className="text-sm font-medium mb-2">Position Change</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  {filters.positionChange === 'improved' ? 'Improved' : 
                   filters.positionChange === 'declined' ? 'Declined' :
                   filters.positionChange === 'same' ? 'No change' : 'Any'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                  checked={filters.positionChange === null || filters.positionChange === undefined}
                  onCheckedChange={() => setFilters({ ...filters, positionChange: null })}
                >
                  Any
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.positionChange === 'improved'}
                  onCheckedChange={() => setFilters({ ...filters, positionChange: 'improved' })}
                >
                  Improved
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.positionChange === 'declined'}
                  onCheckedChange={() => setFilters({ ...filters, positionChange: 'declined' })}
                >
                  Declined
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.positionChange === 'same'}
                  onCheckedChange={() => setFilters({ ...filters, positionChange: 'same' })}
                >
                  No change
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
