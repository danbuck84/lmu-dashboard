
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { TrackLayout, FilterOptions } from './types';

type TrackFilterProps = {
  trackLayouts: TrackLayout[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
};

const TrackFilter: React.FC<TrackFilterProps> = ({ trackLayouts, filters, setFilters }) => {
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
          <SelectItem value="all">All tracks</SelectItem>
          {sortedTrackLayouts.map((layout) => (
            <SelectItem key={layout.id} value={layout.id}>
              {layout.tracks?.name} ({layout.name})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TrackFilter;
