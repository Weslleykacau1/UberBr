
'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/screens/welcome-screen';
import PassengerView from '@/components/screens/passenger-view';
import DriverView from '@/components/screens/driver-view';
import AdminDashboard from '@/components/screens/admin-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { screen, user, setScreen, isDarkMode } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!user && (screen === 'passenger' || screen === 'driver' || screen === 'admin')) {
        setScreen('welcome');
    }
    
    if (screen === 'login') {
      router.push('/login');
    } else if (screen === 'register') {
      router.push('/register');
    }
  }, [user, screen, router, setScreen]);

  const renderScreen = () => {
    switch (screen) {
      case 'passenger':
        return <PassengerView />;
      case 'driver':
        return <DriverView />;
      case 'admin':
        return <AdminDashboard />;
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
