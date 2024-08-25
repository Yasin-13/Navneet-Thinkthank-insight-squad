"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// src/context/AuthContext.tsx

export interface AuthContextType {
  token: string | null;
  user: { name: string } | null;
  login: (newToken: string) => void;
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setUser({ name: "User's Name" }); // Set the user's name here based on your logic
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    setUser({ name: "User's Name" }); // Set user name after login
    localStorage.setItem('token', newToken);
    router.push('/dashboard');
  };

  return (
    <AuthContext.Provider value={{ token, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
