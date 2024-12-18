import React from 'react';
import type { Metadata } from 'next';
import { Onest } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import '../app/globals.css'
import FloatingThemeToggle from '@/components/ui/DarkModeButton';
import 'sweetalert2/dist/sweetalert2.min.css';
import Providers from './providers';

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
          <Providers>
            {children}
            <FloatingThemeToggle />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}