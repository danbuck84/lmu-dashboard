
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

type User = {
  username: string;
  email: string;
  isLoggedIn: boolean;
  initialDR: number;
  initialSR: number;
} | null;

interface AuthContextType {
  user: User;
  login: (userData: Omit<User, 'isLoggedIn'>) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from Supabase session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setUser(null);
          setLoading(false);
          return;
        }
        
        if (session) {
          const userData = session.user.user_metadata;
          setUser({
            username: userData.username || '',
            email: session.user.email || '',
            isLoggedIn: true,
            initialDR: userData.initialDR || 1200,
            initialSR: userData.initialSR || 75
          });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const userData = session.user.user_metadata;
        setUser({
          username: userData.username || '',
          email: session.user.email || '',
          isLoggedIn: true,
          initialDR: userData.initialDR || 1200,
          initialSR: userData.initialSR || 75
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = (userData: Omit<User, 'isLoggedIn'>) => {
    if (!userData) return;
    const newUser = { ...userData, isLoggedIn: true };
    setUser(newUser);
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {loading ? <div>Loading auth state...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
