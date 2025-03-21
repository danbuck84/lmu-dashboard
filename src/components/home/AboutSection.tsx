
import React from 'react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
