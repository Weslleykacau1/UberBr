'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/screens/welcome-screen';
import PassengerView from '@/components/screens/passenger-view';
import DriverView from '@/components/screens/driver-view';
import AdminDashboard from '@/components/screens/admin-dashboard';
import LoginScreen from './(auth)/login/page';

export default function Home() {
  const { screen, user } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && (screen === 'passenger' || screen === 'driver' || screen === 'admin')) {
        router.push('/login');
    }
  }, [user, screen, router]);

  const renderScreen = () => {
    switch (screen) {
      case 'passenger':
        return <PassengerView />;
      case 'driver':
        return <DriverView />;
      case 'admin':
        return <AdminDashboard />;
      case 'login':
        return <LoginScreen />;
      case 'register':
         router.push('/register');
         return null; // Redirecting
      case 'welcome':
      default:
        return <WelcomeScreen />;
    }
  };
  
  return (
      <div className="container mx-auto max-w-lg p-0 h-screen">
        {renderScreen()}
      </div>
  );
}
