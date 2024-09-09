import React from 'react';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/styles/globals.css';

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
          <nav>
            {/* Agregar navegación aquí */}
          </nav>
          <main>{children}</main>
          <footer>
            <p>&copy; 2024 Doctor Cel. Todos los derechos reservados.</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}