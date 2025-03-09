
import { Input } from '@/components/ui/input';
import { FilterOptions } from './types';

type DateFilterProps = {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
};

const DateFilter: React.FC<DateFilterProps> = ({ filters, setFilters }) => {
  return (
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
  );
};

export default DateFilter;
