'use client';

import React, { type ReactNode } from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/ui/toast';
import { AnalyticsProvider } from '@/components/providers/analytics-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
        <AnalyticsProvider />
      </ToastProvider>
    </ThemeProvider>
  );
}
