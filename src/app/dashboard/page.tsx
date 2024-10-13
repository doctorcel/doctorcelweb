import React from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import styles from '@/styles/dashboard/Dashboard.module.scss';


export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-green-600 dark:text-green-400">Panel de Administración</h1>
        <div className={styles.modules}>
          <h4>Bienvenido al panel de administración en la barra de navegación izquierda puedes seleccionar la opción que necesitas.</h4>
        </div>
      </div>
    </ProtectedRoute>
  );
}