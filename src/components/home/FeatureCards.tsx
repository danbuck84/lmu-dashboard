
import React from 'react';

const FeatureCards = () => {
  return (
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
  );
};

export default FeatureCards;
