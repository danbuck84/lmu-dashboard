
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-36 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Track Your Le Mans Ultimate Racing Journey
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Monitor your progress, analyze performance, and improve your driving with our comprehensive racing statistics tracker built specifically for Le Mans Ultimate.
                </p>
              </div>
              <div className="space-x-4 mt-6">
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">What Our Racing Tracker Offers</h2>
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
                Monitor your driver rating and safety rating changes over time with detailed statistical analysis and visual charts.
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
                Get insights on your race performance across different tracks and cars. Compare your results to identify strengths and areas for improvement.
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
                Learn from your past races to enhance your racing strategy. Identify patterns and make data-driven decisions for better race outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="container px-4 md:px-6 py-12 md:py-16 lg:py-20 bg-muted/50">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">About Le Mans Ultimate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="mb-4">
                Le Mans Ultimate is a racing simulation that offers an authentic 24 Hours of Le Mans experience. As the spiritual successor to Endurance Series, this hyper-realistic racing simulator provides unprecedented immersion and challenge.
              </p>
              <p className="mb-4">
                Our tracking tool is designed specifically to help drivers monitor their progress in this demanding racing environment, providing insights that help improve your performance race after race.
              </p>
              <p>
                Whether you're a casual racer or aiming for esports competition, our statistics tracker gives you the data you need to reach your full potential on the virtual track.
              </p>
            </div>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track performance across different cars and classes
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Monitor driver and safety rating progression
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Analyze position changes from start to finish
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Visualize race history with interactive charts
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Compare performance across different track layouts
                </li>
              </ul>
            </Card>
          </div>
        </section>
      </main>
      
      <footer className="border-t mt-12">
        <div className="container px-4 py-10 md:py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Le Mans Ultimate Tracker</h3>
              <p className="text-muted-foreground">
                Your complete solution for tracking and improving your racing performance in Le Mans Ultimate.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto" onClick={() => navigate('/')}>Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto" onClick={() => navigate('/race-log')}>Race Log</Button></li>
                <li><Button variant="link" className="p-0 h-auto" onClick={() => navigate('/dashboard')}>Dashboard</Button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto">Privacy Policy</Button></li>
                <li><Button variant="link" className="p-0 h-auto">Terms of Service</Button></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            © 2023 Le Mans Ultimate Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
