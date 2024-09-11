import React from 'react';
import type { Metadata } from 'next';
import { Onest } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import '../app/globals.css'

const onest = Onest({weight: "400", subsets: ["latin"]})

export const metadata: Metadata = {
  title: 'Doctor Cel',
  description: 'Tu tienda de celulares y accesorios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <main className={onest.className}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}