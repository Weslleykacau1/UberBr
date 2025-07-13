'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  email: string;
  password?: string;
  role: 'passenger' | 'driver' | 'admin';
  name: string;
  status: 'approved' | 'pending' | 'rejected';
};

type Screen = 'welcome' | 'login' | 'register' | 'passenger' | 'driver' | 'admin';

type AppContextType = {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  user: User | null;
  users: User[];
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleLogin: (email: string, password?: string) => void;
  handleRegister: (newUser: Omit<User, 'id' | 'status'>) => void;
  handleLogout: () => void;
  handleUpdateUsers: (updatedUsers: User[]) => void;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);

const initialUsers: User[] = [
    { id: 1, email: 'passageiro@email.com', password: '123', role: 'passenger', name: 'Alex', status: 'approved' },
    { id: 2, email: 'motorista@email.com', password: '123', role: 'driver', name: 'Bruno', status: 'approved' },
    { id: 3, email: 'admin@email.com', password: '123', role: 'admin', name: 'Admin', status: 'approved' },
    { id: 4, email: 'novo.motorista@email.com', password: '123', role: 'driver', name: 'Carla', status: 'pending' },
    { id: 5, email: 'novo.passageiro@email.com', password: '123', role: 'passenger', name: 'Daniel', status: 'pending' },
];


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.body.className = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  }, [isDarkMode]);

  const handleLogin = (email: string, password?: string) => {
    const masterPassword = 'masterpass';
    const testPassenger = { id: 99, email: 'passageiro@teste.com', role: 'passenger', name: 'Passageiro Teste', status: 'approved' } as User;
    const testDriver = { id: 98, email: 'motorista@teste.com', role: 'driver', name: 'Motorista Teste', status: 'approved' } as User;

    if (password === masterPassword) {
        if (email === testPassenger.email) { 
            setUser(testPassenger); 
            setScreen('passenger'); 
            router.push('/');
            return;
        }
        if (email === testDriver.email) { 
            setUser(testDriver); 
            setScreen('driver'); 
            router.push('/');
            return; 
        }
    }

    const foundUser = users.find(u => u.email === email && u.password === password);
    if (!foundUser) { alert('Credenciais inválidas!'); return; }
    if (foundUser.role === 'admin') { 
        setUser(foundUser); 
        setScreen('admin'); 
        router.push('/');
        return; 
    }
    if (foundUser.status === 'approved') { 
        setUser(foundUser); 
        setScreen(foundUser.role);
        router.push('/');
    } 
    else if (foundUser.status === 'pending') { alert('Sua conta ainda não foi aprovada.'); } 
    else { alert('Seu cadastro foi rejeitado ou sua conta está inativa.'); }
  };

  const handleRegister = (newUser: Omit<User, 'id' | 'status'>) => {
    if (users.find(u => u.email === newUser.email)) { alert('Email já cadastrado!'); return; }
    const userWithStatus: User = { ...newUser, id: users.length + 1, status: 'pending' };
    setUsers([...users, userWithStatus]);
    alert('Cadastro recebido! Sua conta está pendente de aprovação pelo administrador.');
    setScreen('login');
    router.push('/login');
  };

  const handleLogout = () => { 
      setUser(null); 
      setScreen('welcome');
      router.push('/');
  };
  
  const handleUpdateUsers = (updatedUsers: User[]) => { 
      setUsers(updatedUsers); 
  };
  
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const value = {
    screen,
    setScreen,
    user,
    users,
    isDarkMode,
    toggleDarkMode,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
