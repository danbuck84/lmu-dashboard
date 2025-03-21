
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/home/Hero';
import FeatureCards from '@/components/home/FeatureCards';
import AboutSection from '@/components/home/AboutSection';
import Footer from '@/components/home/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <Hero />
        <FeatureCards />
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
