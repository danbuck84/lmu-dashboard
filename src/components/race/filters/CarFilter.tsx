
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Car, FilterOptions } from './types';

type CarFilterProps = {
  cars: Car[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
};

const CarFilter: React.FC<CarFilterProps> = ({ cars, filters, setFilters }) => {
  // Group cars by class
  const carsByClass = cars.reduce((acc: { [key: string]: Car[] }, car) => {
    const carClass = car.class || 'Other';
    if (!acc[carClass]) {
      acc[carClass] = [];
    }
    acc[carClass].push(car);
    return acc;
  }, {});

  return (
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
          <SelectItem value="all">All cars</SelectItem>
          {Object.entries(carsByClass).map(([carClass, carsInClass]) => (
            <React.Fragment key={carClass}>
              <SelectItem value={`__header_${carClass}`} disabled className="font-semibold bg-muted">
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
  );
};

export default CarFilter;
