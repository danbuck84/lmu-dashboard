
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  
  return (
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
              <li><Button variant="link" className="p-0 h-auto" onClick={() => navigate('/privacy-policy')}>Privacy Policy</Button></li>
              <li><Button variant="link" className="p-0 h-auto" onClick={() => navigate('/terms-of-service')}>Terms of Service</Button></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2025 Le Mans Ultimate Tracker by Daniel Buck. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
