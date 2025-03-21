
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
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
  );
};

export default Hero;
