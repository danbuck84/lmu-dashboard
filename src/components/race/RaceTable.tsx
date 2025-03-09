
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type Race = {
  id: string;
  race_date: string;
  cars?: { model: string; class?: string };
  track_layouts?: { 
    name: string;
    tracks?: { name: string };
  };
  start_position: number;
  finish_position: number;
  driver_rating_change: number;
  safety_rating_change: number;
  incidents?: number;
  notes?: string;
  qualifying_position?: number;
};

type RaceTableProps = {
  races: Race[];
  loading: boolean;
};

const RaceTable = ({ races, loading }: RaceTableProps) => {
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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
              <tr key={race.id} className="border-b hover:bg-muted/50">
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => viewRaceDetails(race)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedRace && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Race Details</DialogTitle>
              <DialogDescription>
                {new Date(selectedRace.race_date).toLocaleDateString('en-US', { 
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
                  <span className="text-muted-foreground">{selectedRace.cars?.model}</span>
                </div>
                {selectedRace.cars?.class && (
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Class</h3>
                    <Badge variant="outline">{selectedRace.cars.class}</Badge>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Track</h3>
                  <span className="text-muted-foreground">{selectedRace.track_layouts?.tracks?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Layout</h3>
                  <span className="text-muted-foreground">{selectedRace.track_layouts?.name}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                <h3 className="font-medium">Race Results</h3>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {selectedRace.qualifying_position !== undefined && (
                    <div>
                      <span className="text-sm text-muted-foreground">Qualifying</span>
                      <p className="font-medium text-lg">P{selectedRace.qualifying_position}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-muted-foreground">Start</span>
                    <p className="font-medium text-lg">P{selectedRace.start_position}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Finish</span>
                    <p className="font-medium text-lg">P{selectedRace.finish_position}</p>
                  </div>
                  {selectedRace.incidents !== undefined && (
                    <div>
                      <span className="text-sm text-muted-foreground">Incidents</span>
                      <p className="font-medium text-lg">{selectedRace.incidents}</p>
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
                      selectedRace.driver_rating_change > 0 
                        ? 'text-green-500' 
                        : selectedRace.driver_rating_change < 0 
                        ? 'text-red-500' 
                        : ''
                    }`}>
                      {selectedRace.driver_rating_change > 0 
                        ? `+${Number(selectedRace.driver_rating_change).toFixed(2)}` 
                        : Number(selectedRace.driver_rating_change).toFixed(2)
                      }
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Safety Rating</span>
                    <p className={`font-medium text-lg ${
                      selectedRace.safety_rating_change > 0 
                        ? 'text-green-500' 
                        : selectedRace.safety_rating_change < 0 
                        ? 'text-red-500' 
                        : ''
                    }`}>
                      {selectedRace.safety_rating_change > 0 
                        ? `+${Number(selectedRace.safety_rating_change).toFixed(2)}` 
                        : Number(selectedRace.safety_rating_change).toFixed(2)
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              {selectedRace.notes && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <h3 className="font-medium">Notes</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedRace.notes}</p>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default RaceTable;
