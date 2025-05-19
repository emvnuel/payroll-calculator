import "@/styles/globals.css";
import React from "react";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

import { DevtoolsProvider } from 'creatr-devtools'
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "salario.ninja | Calculadora de Folha de Pagamento",
    template: "%s | salario.ninja",
  },
  description: "Calcule o salário líquido, descontos de INSS e IRRF para funcionários. Simulador completo de folha de pagamento com valores atualizados para 2024.",
  applicationName: "salario.ninja",
  keywords: ["folha de pagamento", "salário", "cálculo", "rh", "recursos humanos", "INSS", "IRRF", "imposto de renda", "desconto", "simulador", "calculadora"],
  authors: [{ name: "Equipe Payroll" }],
  creator: "Equipe Payroll",
  publisher: "Equipe Payroll",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Calculadora de Folha",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://salario.ninja/",
    title: "salario.ninja | Calculadora de Folha de Pagamento",
    description: "Calcule o salário líquido, descontos de INSS e IRRF para funcionários. Simulador completo de folha de pagamento com valores atualizados para 2024.",
    siteName: "Calculadora de Folha de Pagamento",
    images: [{
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Calculadora de Folha de Pagamento"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Folha de Pagamento | Cálculo INSS e IRRF",
    description: "Calcule o salário líquido, descontos de INSS e IRRF para funcionários",
    images: ["/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://salario.ninja/",
    languages: {
      'pt-BR': "https://salario.ninja/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable}`}>
      <head>
        <link rel="canonical" href="https://salario.ninja/" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DevtoolsProvider>{children}</DevtoolsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
