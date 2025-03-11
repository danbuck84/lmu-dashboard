
import React, { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import EditRaceDialog from './EditRaceDialog';
import RaceTableRow from './table/RaceTableRow';
import RaceDetailsDialog from './table/RaceDetailsDialog';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Race, SortField, SortDirection } from './table/types';

type RaceTableProps = {
  races: Race[];
  loading: boolean;
  onRaceDeleted: (raceId: string) => void;
  onRaceUpdated: (updatedRace: Race) => void;
};

const RaceTable = ({ races, loading, onRaceDeleted, onRaceUpdated }: RaceTableProps) => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>('race_date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (loading) {
    return <p className="text-center py-4">Loading races...</p>;
  }
  
  if (races.length === 0) {
    return <p className="text-muted-foreground text-center py-4">No races match the selected filters.</p>;
  }

  const viewRaceDetails = (race: Race) => {
    setSelectedRace(race);
    setDetailsOpen(true);
  };
  
  const handleEditRace = (race: Race) => {
    setSelectedRace(race);
    setEditDialogOpen(true);
  };

  const handleDeleteRace = async (raceId: string) => {
    try {
      setDeleteLoading(true);
      const { error } = await supabase
        .from('races')
        .delete()
        .eq('id', raceId);
      
      if (error) throw error;
      
      toast.success('Race deleted successfully');
      onRaceDeleted(raceId);
      setDetailsOpen(false);
    } catch (error) {
      console.error('Error deleting race:', error);
      toast.error('Failed to delete race');
    } finally {
      setDeleteLoading(false);
    }
  };
  
  // Add race numbers to the races
  const racesWithNumbers = races.map((race, index) => ({
    ...race,
    race_number: index + 1
  }));

  // Handle column sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if already sorting by this field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort the races based on current sort settings
  const sortedRaces = [...racesWithNumbers].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    
    switch (sortField) {
      case 'race_number':
        return (a.race_number! - b.race_number!) * multiplier;
      case 'race_date':
        return (new Date(a.race_date).getTime() - new Date(b.race_date).getTime()) * multiplier;
      case 'car':
        return (a.cars?.model || '').localeCompare(b.cars?.model || '') * multiplier;
      case 'track':
        const trackA = `${a.track_layouts?.tracks?.name || ''} (${a.track_layouts?.name || ''})`;
        const trackB = `${b.track_layouts?.tracks?.name || ''} (${b.track_layouts?.name || ''})`;
        return trackA.localeCompare(trackB) * multiplier;
      case 'series':
        return (a.series || '').localeCompare(b.series || '') * multiplier;
      case 'start_position':
        return (a.start_position - b.start_position) * multiplier;
      case 'finish_position':
        return (a.finish_position - b.finish_position) * multiplier;
      case 'driver_rating_change':
        return (a.driver_rating_change - b.driver_rating_change) * multiplier;
      case 'safety_rating_change':
        return (a.safety_rating_change - b.safety_rating_change) * multiplier;
      default:
        return 0;
    }
  });

  // Helper for rendering sort indicator
  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline ml-1" /> : 
      <ChevronDown className="h-4 w-4 inline ml-1" />;
  };
  
  // Helper for creating sortable column headers
  const SortableHeader = ({ field, label }: { field: SortField, label: string }) => (
    <th 
      className="py-2 px-4 text-left cursor-pointer hover:bg-muted/50"
      onClick={() => handleSort(field)}
    >
      <span className="flex items-center">
        {label}
        <SortIndicator field={field} />
      </span>
    </th>
  );
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <SortableHeader field="race_number" label="#" />
              <SortableHeader field="race_date" label="Date" />
              <SortableHeader field="car" label="Car" />
              <SortableHeader field="track" label="Track" />
              <SortableHeader field="series" label="Series" />
              <SortableHeader field="start_position" label="Start" />
              <SortableHeader field="finish_position" label="Finish" />
              <SortableHeader field="driver_rating_change" label="DR Change" />
              <SortableHeader field="safety_rating_change" label="SR Change" />
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRaces.map((race) => (
              <RaceTableRow
                key={race.id}
                race={race}
                onViewDetails={viewRaceDetails}
              />
            ))}
          </tbody>
        </table>
      </div>

      <RaceDetailsDialog
        race={selectedRace}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onEditRace={handleEditRace}
        onDeleteRace={handleDeleteRace}
        deleteLoading={deleteLoading}
      />

      {selectedRace && (
        <EditRaceDialog 
          open={editDialogOpen} 
          onOpenChange={setEditDialogOpen} 
          race={selectedRace}
          onRaceUpdated={onRaceUpdated}
        />
      )}
    </>
  );
};

export default RaceTable;
