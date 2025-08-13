import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'user' | 'developer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('current');

  if (token && currentUser) {
    try {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
      setLoading(false)
    } catch (e) {
      console.error("Error parsing user from localStorage:", e);
    }
  }

  
}, []);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    // const response2 = await fetch('http://localhost:5000/getName', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email, role }),
    // });

    // if (!response2.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Login failed');
    // }

    // const data2 = await response2.json();
    const data = await response.json();
    // data.user.name = data2.name;
    localStorage.setItem('token', data.token);
    console.log(data.user);
    setUser(data.user);
    localStorage.setItem("current", JSON.stringify(data.user))
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}