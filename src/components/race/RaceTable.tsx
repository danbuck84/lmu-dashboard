
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import EditRaceDialog from './EditRaceDialog';
import RaceTableRow from './table/RaceTableRow';
import RaceDetailsDialog from './table/RaceDetailsDialog';
import type { Race } from './table/types';

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
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Car</th>
              <th className="py-2 px-4 text-left">Track</th>
              <th className="py-2 px-4 text-center">Start</th>
              <th className="py-2 px-4 text-center">Finish</th>
              <th className="py-2 px-4 text-center">DR Change</th>
              <th className="py-2 px-4 text-center">SR Change</th>
              <th className="py-2 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => (
              <RaceTableRow
                key={race.id}
                race={race}
                onViewDetails={viewRaceDetails}
                onEditRace={handleEditRace}
                onDeleteRace={handleDeleteRace}
                deleteLoading={deleteLoading}
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
