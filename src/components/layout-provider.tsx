
'use client';

import { AppProvider } from '@/context/app-context';
import { useState, useEffect, ReactNode } from 'react';

export default function LayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return <AppProvider>{isClient ? children : null}</AppProvider>;
}
