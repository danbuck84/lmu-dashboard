
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  flags: {
    svg: string;
    png: string;
  };
}

export const useCountryData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data: Country[] = await response.json();
        
        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a, b) => 
          a.name.common.localeCompare(b.name.common)
        );
        
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
        toast.error('Failed to load countries data');
      }
    };

    fetchCountries();
  }, []);

  return { countries };
};
