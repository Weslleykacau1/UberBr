'use client';

import { useState } from 'react';
import { PassengerView } from '@/components/passenger-view';
import { DriverView } from '@/components/driver-view';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type View = 'passenger' | 'driver';

export default function Home() {
  const [view, setView] = useState<View>('passenger');

  const toggleView = () => {
    setView((currentView) => (currentView === 'passenger' ? 'driver' : 'passenger'));
  };

  const isPassengerView = view === 'passenger';

  return (
    <div className="flex flex-col h-screen bg-background max-w-md mx-auto">
      {isPassengerView ? <Header /> : null}
      <main className="flex-grow relative">
        {isPassengerView ? (
          <PassengerView toggleView={toggleView}/>
        ) : (
          <DriverView toggleView={toggleView} />
        )}
      </main>
      {isPassengerView ? <Footer /> : null}
    </div>
  );
}
