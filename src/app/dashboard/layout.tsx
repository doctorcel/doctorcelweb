import React from 'react';
import type { Metadata } from 'next';
import NavBarDashboard from '@/components/dashboard/navbar/Navbar';
import '../globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Panel de Administración',
  description: 'Tu tienda de celulares, accesorios y servicio técnico especializado.',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-shrink-0">
        <NavBarDashboard />
      </div>
      <main className="flex-grow overflow-auto">
      <AuthProvider>
        {children}
        </ AuthProvider>

      </main>
    </div>
  );
}