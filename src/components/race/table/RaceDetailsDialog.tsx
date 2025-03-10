
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
  deleteLoading
}: RaceDetailsDialogProps) => {
  if (!race) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Race Details</DialogTitle>
          <DialogDescription>
            {new Date(race.race_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Car</h3>
              <span className="text-muted-foreground">{race.cars?.model}</span>
            </div>
            {race.cars?.class && (
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Class</h3>
                <Badge variant="outline">{race.cars.class}</Badge>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Track</h3>
              <span className="text-muted-foreground">{race.track_layouts?.tracks?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Layout</h3>
              <span className="text-muted-foreground">{race.track_layouts?.name}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <h3 className="font-medium">Race Results</h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {race.qualifying_position !== undefined && (
                <div>
                  <span className="text-sm text-muted-foreground">Qualifying</span>
                  <p className="font-medium text-lg">P{race.qualifying_position}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">Start</span>
                <p className="font-medium text-lg">P{race.start_position}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Finish</span>
                <p className="font-medium text-lg">P{race.finish_position}</p>
              </div>
              {race.incidents !== undefined && (
                <div>
                  <span className="text-sm text-muted-foreground">Incidents</span>
                  <p className="font-medium text-lg">{race.incidents}</p>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <h3 className="font-medium">Rating Changes</h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <span className="text-sm text-muted-foreground">Driver Rating</span>
                <p className={`font-medium text-lg ${
                  race.driver_rating_change > 0 
                    ? 'text-green-500' 
                    : race.driver_rating_change < 0 
                    ? 'text-red-500' 
                    : ''
                }`}>
                  {race.driver_rating_change > 0 
                    ? `+${Number(race.driver_rating_change).toFixed(2)}` 
                    : Number(race.driver_rating_change).toFixed(2)
                  }
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Safety Rating</span>
                <p className={`font-medium text-lg ${
                  race.safety_rating_change > 0 
                    ? 'text-green-500' 
                    : race.safety_rating_change < 0 
                    ? 'text-red-500' 
                    : ''
                }`}>
                  {race.safety_rating_change > 0 
                    ? `+${Number(race.safety_rating_change).toFixed(2)}` 
                    : Number(race.safety_rating_change).toFixed(2)
                  }
                </p>
              </div>
            </div>
          </div>
          
          {race.notes && (
            <>
              <Separator />
              <div className="space-y-1">
                <h3 className="font-medium">Notes</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{race.notes}</p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                onOpenChange(false);
                onEditRace(race);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
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
          </div>
          <Button 
            variant="default" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RaceDetailsDialog;
