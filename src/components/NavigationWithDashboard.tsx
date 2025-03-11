
import React from 'react';
import Navigation from './Navigation';

// This component simply wraps the original Navigation component
// The Navigation component already has internal logic to add the Dashboard link
// in its own navigation items, so we don't need to modify it directly
const NavigationWithDashboard = () => {
  return <Navigation />;
};

export default NavigationWithDashboard;
