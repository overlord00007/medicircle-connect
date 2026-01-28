import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUsers: Record<UserRole, User> = {
  patient: {
    id: '1',
    name: 'John Patient',
    email: 'patient@medicova.com',
    role: 'patient',
  },
  doctor: {
    id: '2',
    name: 'Dr. Sarah Smith',
    email: 'doctor@medicova.com',
    role: 'doctor',
  },
  pharmacist: {
    id: '3',
    name: 'James Pharmacist',
    email: 'pharmacist@medicova.com',
    role: 'pharmacist',
  },
  admin: {
    id: '4',
    name: 'Admin User',
    email: 'admin@medicova.com',
    role: 'admin',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login - in real app would validate credentials
    setUser(mockUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
