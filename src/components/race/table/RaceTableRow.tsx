
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Race } from './types';

type RaceTableRowProps = {
  race: Race;
  onViewDetails: (race: Race) => void;
  onEditRace: (race: Race) => void;
  onDeleteRace: (raceId: string) => void;
  deleteLoading: boolean;
};

const RaceTableRow = ({ 
  race, 
  onViewDetails, 
  onEditRace, 
  onDeleteRace, 
  deleteLoading 
}: RaceTableRowProps) => {
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="py-2 px-4">{new Date(race.race_date).toLocaleDateString()}</td>
      <td className="py-2 px-4">{race.cars?.model}</td>
      <td className="py-2 px-4">{race.track_layouts?.tracks?.name} ({race.track_layouts?.name})</td>
      <td className="py-2 px-4 text-center">{race.start_position}</td>
      <td className="py-2 px-4 text-center">{race.finish_position}</td>
      <td className="py-2 px-4 text-center">
        <span className={race.driver_rating_change > 0 ? 'text-green-500' : race.driver_rating_change < 0 ? 'text-red-500' : ''}>
          {race.driver_rating_change > 0 ? `+${Number(race.driver_rating_change).toFixed(2)}` : Number(race.driver_rating_change).toFixed(2)}
        </span>
      </td>
      <td className="py-2 px-4 text-center">
        <span className={race.safety_rating_change > 0 ? 'text-green-500' : race.safety_rating_change < 0 ? 'text-red-500' : ''}>
          {race.safety_rating_change > 0 ? `+${Number(race.safety_rating_change).toFixed(2)}` : Number(race.safety_rating_change).toFixed(2)}
        </span>
      </td>
      <td className="py-2 px-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewDetails(race)}
          >
            View
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEditRace(race)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the race data
                  and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDeleteRace(race.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default RaceTableRow;
