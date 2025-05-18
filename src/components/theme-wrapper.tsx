'use client';

import { useTheme } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import { useEffect, useState } from 'react';

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Only render children once mounted on client
  useEffect(() => {
    setMounted(true);
    // Force light theme to ensure consistency
    setTheme('light');
  }, [setTheme]);

  if (!mounted) {
    // Return a placeholder with only the font class during SSR
    return (
      <html lang="pt-BR" className={GeistSans.variable}>
        <head />
        <body>{children}</body>
      </html>
    );
  }
  
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${theme}`} style={{ colorScheme: theme as any }}>
      <head />
      <body>{children}</body>
    </html>
  );
}
