
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Le Mans Ultimate Racing Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Monitor your progress, analyze performance, and improve your driving with our racing statistics tracker.
                </p>
              </div>
              <div className="space-x-4">
                {isAuthenticated ? (
                  <Button onClick={() => navigate('/race-log')} size="lg">
                    Go to Race Log
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => navigate('/login')} variant="outline" size="lg">
                      Log In
                    </Button>
                    <Button onClick={() => navigate('/register')} size="lg">
                      Register Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Track Progress</h3>
              <p className="text-center text-muted-foreground">
                Monitor your driver rating and safety rating changes over time.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Analyze Performance</h3>
              <p className="text-center text-muted-foreground">
                Get insights on your race performance across different tracks and cars.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="p-3 rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="m3 11 18-5v12L3 14v-3Z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Improve Strategy</h3>
              <p className="text-center text-muted-foreground">
                Learn from your past races to enhance your racing strategy.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            © 2023 Le Mans Ultimate Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
