
'use client';

import { AppProvider } from '@/context/app-context';
import { useState, useEffect } from 'react';

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // By returning null until we are on the client, we prevent hydration mismatches.
  if (!isClient) {
    return null;
  }

  return <AppProvider>{children}</AppProvider>;
}
