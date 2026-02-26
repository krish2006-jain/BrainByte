import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  guestLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedGuest = localStorage.getItem("isGuest");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedGuest) {
      setIsGuest(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simple validation (in production, this would call a backend API)
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
    };
    
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.removeItem("isGuest");
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simple validation (in production, this would call a backend API)
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
    };
    
    setUser(newUser);
    setIsGuest(false);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.removeItem("isGuest");
  };

  const guestLogin = () => {
    const guestUser: User = {
      id: "guest",
      name: "Guest User",
      email: "guest@example.com",
    };
    
    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem("isGuest", "true");
    localStorage.setItem("user", JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isGuest");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isGuest,
        login,
        signup,
        guestLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  // Return default context if not within provider (for development/testing)
  if (context === undefined) {
    return {
      user: null,
      isAuthenticated: false,
      isGuest: false,
      login: async () => {},
      signup: async () => {},
      guestLogin: () => {},
      logout: () => {},
    } as AuthContextType;
  }
  return context;
}
