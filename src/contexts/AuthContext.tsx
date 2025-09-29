import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  state: 'TN' | 'KL';
  farmSize?: string;
  mainCrops?: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - replace with actual API call
    if (email && password) {
      setUser({
        id: '1',
        name: 'Rajesh Kumar',
        email: email,
        phone: '+91 9876543210',
        state: 'TN',
        farmSize: '5 acres',
        mainCrops: ['Paddy', 'Groundnut']
      });
      return true;
    }
    return false;
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Mock registration - replace with actual API call
    if (userData.email && userData.password) {
      setUser({
        id: Math.random().toString(),
        name: userData.name || '',
        email: userData.email,
        phone: userData.phone,
        state: userData.state || 'TN',
        farmSize: userData.farmSize,
        mainCrops: userData.mainCrops
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};