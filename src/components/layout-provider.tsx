
'use client';

import { AppProvider } from '@/context/app-context';
import { ReactNode } from 'react';

export default function LayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <AppProvider>{children}</AppProvider>;
}
