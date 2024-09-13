import React from 'react';
import type { Metadata } from 'next';
import { Onest } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from 'next-themes';
import '../app/globals.css'
import FloatingThemeToggle from '@/components/ui/DarkModeButton';

const onest = Onest({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Doctor Cel',
  description: 'Tu tienda de celulares, accesorios y servicio tecnico especializado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={onest.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <FloatingThemeToggle />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}