
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AddRaceDialog from '@/components/AddRaceDialog';
import Navigation from '@/components/Navigation';
import { toast } from 'sonner';

const RaceLog = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [races, setRaces] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please log in to view race logs');
      navigate('/register');
      return;
    }

    // Load races from localStorage
    const storedRaces = JSON.parse(localStorage.getItem('races') || '[]');
    setRaces(storedRaces);
  }, [isAuthenticated, navigate]);

  const handleRaceAdded = (newRace: any) => {
    setRaces(prevRaces => [...prevRaces, newRace]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="container mx-auto py-8 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Race Log</h1>
          {isAuthenticated && <AddRaceDialog onRaceAdded={handleRaceAdded} />}
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          {races.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b dark:border-slate-700">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Series</th>
                    <th className="py-2 px-4 text-left">Car</th>
                    <th className="py-2 px-4 text-left">Track</th>
                    <th className="py-2 px-4 text-center">Start</th>
                    <th className="py-2 px-4 text-center">Finish</th>
                    <th className="py-2 px-4 text-center">DR Change</th>
                    <th className="py-2 px-4 text-center">SR Change</th>
                    <th className="py-2 px-4 text-center">Best Lap</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {races.map((race, index) => (
                    <tr key={race.id || index} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="py-2 px-4">{race.date}</td>
                      <td className="py-2 px-4">{race.series}</td>
                      <td className="py-2 px-4">{race.car}</td>
                      <td className="py-2 px-4">{race.track} ({race.layout})</td>
                      <td className="py-2 px-4 text-center">{race.startPosition}</td>
                      <td className="py-2 px-4 text-center">{race.finishPosition}</td>
                      <td className="py-2 px-4 text-center">
                        <span className={race.drChange > 0 ? 'text-green-500' : race.drChange < 0 ? 'text-red-500' : ''}>
                          {race.drChange > 0 ? `+${race.drChange}` : race.drChange}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <span className={race.srChange > 0 ? 'text-green-500' : race.srChange < 0 ? 'text-red-500' : ''}>
                          {race.srChange > 0 ? `+${race.srChange}` : race.srChange}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-center">{race.bestLapTime}</td>
                      <td className="py-2 px-4 text-center">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Your race logs will appear here. Add your first race to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceLog;
