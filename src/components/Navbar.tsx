
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, ChevronDown, Clock, Flag, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="w-full fixed top-0 z-50 glass border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <Flag className="h-6 w-6 text-racing-red mr-2" />
              <span className="text-lg font-medium">Le Mans Tracker</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                to="/dashboard" 
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive('/dashboard') 
                    ? 'bg-secondary text-primary font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/races" 
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive('/races') 
                    ? 'bg-secondary text-primary font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Race Log
              </Link>
              <Link 
                to="/ratings" 
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive('/ratings') 
                    ? 'bg-secondary text-primary font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Ratings
              </Link>
              <Link 
                to="/analysis" 
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive('/analysis') 
                    ? 'bg-secondary text-primary font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Analysis
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button variant="outline" className="mr-2 hidden md:flex">
              Sign In
            </Button>
            <Button className="hidden md:flex">
              Register
            </Button>
            
            {/* Mobile Navigation */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" className="px-2">
                  <span className="sr-only">Menu</span>
                  <ChevronDown className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center">
                    <Layout className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/races" className="flex items-center">
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Race Log</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/ratings" className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Ratings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/analysis" className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Analysis</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex items-center">
                    <span>Sign In</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register" className="flex items-center">
                    <span>Register</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
