"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Override attribute to explicitly target body, not html
  return <NextThemesProvider {...props} attribute="class" element="body">{children}</NextThemesProvider>;
}
