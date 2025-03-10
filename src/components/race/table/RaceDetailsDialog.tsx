
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, Trophy, FileText } from 'lucide-react';
import type { Race } from './types';

type RaceDetailsDialogProps = {
  race: Race | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditRace: (race: Race) => void;
  onDeleteRace: (raceId: string) => void;
  deleteLoading: boolean;
};

const RaceDetailsDialog = ({
  race,
  open,
  onOpenChange,
  onEditRace,
  onDeleteRace,
  deleteLoading,
}: RaceDetailsDialogProps) => {
  if (!race) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Race Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-semibold">Date:</span>
            <span className="col-span-2">{new Date(race.race_date).toLocaleDateString()}</span>
          </div>
          
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-semibold">Car:</span>
            <span className="col-span-2">{race.cars?.model}</span>
          </div>
          
          {race.series && (
            <div className="grid grid-cols-3 items-center gap-4">
              <span className="font-semibold flex items-center gap-1">
                <Trophy className="h-4 w-4" />
                Series:
              </span>
              <span className="col-span-2">{race.series}</span>
            </div>
          )}
          
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-semibold">Track:</span>
            <span className="col-span-2">{race.track_layouts?.tracks?.name} ({race.track_layouts?.name})</span>
          </div>
          
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-semibold">Positions:</span>
            <span className="col-span-2">Start: {race.start_position} → Finish: {race.finish_position}</span>
          </div>
          
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-semibold">Rating Changes:</span>
            <div className="col-span-2">
              <div>
                DR: 
                <span className={race.driver_rating_change > 0 ? 'text-green-500 ml-1' : race.driver_rating_change < 0 ? 'text-red-500 ml-1' : 'ml-1'}>
                  {race.driver_rating_change > 0 ? `+${Number(race.driver_rating_change).toFixed(2)}` : Number(race.driver_rating_change).toFixed(2)}
                </span>
              </div>
              <div>
                SR: 
                <span className={race.safety_rating_change > 0 ? 'text-green-500 ml-1' : race.safety_rating_change < 0 ? 'text-red-500 ml-1' : 'ml-1'}>
                  {race.safety_rating_change > 0 ? `+${Number(race.safety_rating_change).toFixed(2)}` : Number(race.safety_rating_change).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          {race.notes && (
            <div className="grid grid-cols-3 items-start gap-4">
              <span className="font-semibold flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Notes:
              </span>
              <div className="col-span-2 whitespace-pre-wrap">{race.notes}</div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex w-full justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
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
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={() => onEditRace(race)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RaceDetailsDialog;
