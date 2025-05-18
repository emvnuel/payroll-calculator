'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ClientThemeProvider() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Force light theme on client side
    setTheme('light');
    
    // Prevent next-themes from modifying the HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && mutation.target === document.documentElement) {
          // Keep only the font variable class on the HTML element
          const currentClasses = document.documentElement.className;
          const fontClass = currentClasses.match(/__variable_[a-z0-9]+/);
          if (fontClass) {
            document.documentElement.className = fontClass[0];
          }
          
          // Remove style attribute if added
          if (document.documentElement.hasAttribute('style')) {
            document.documentElement.removeAttribute('style');
          }
        }
      });
    });
    
    // Start observing document.documentElement for class attribute changes
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, [setTheme]);

  return null;
}
