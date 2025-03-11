
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRedirectIfNotAuth = (isAuthenticated: boolean) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to access your settings');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
};
