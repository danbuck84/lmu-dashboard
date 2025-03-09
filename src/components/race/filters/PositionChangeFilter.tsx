
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FilterOptions } from './types';

type PositionChangeFilterProps = {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
};

const PositionChangeFilter: React.FC<PositionChangeFilterProps> = ({ filters, setFilters }) => {
  return (
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
  );
};

export default PositionChangeFilter;
