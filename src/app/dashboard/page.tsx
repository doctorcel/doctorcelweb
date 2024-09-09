import React from 'react';
import { ProductManagement } from '@/components/dashboard/ProductManagement';
import { InvoiceManagement } from '@/components/dashboard/InvoiceManagement';
import { TechServiceManagement } from '@/components/dashboard/TechServiceManagement';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import styles from '@/styles/dashboard/Dashboard.module.scss';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <h1>Panel de Administración</h1>
        <div className={styles.modules}>
          <ProductManagement />
          <InvoiceManagement />
          <TechServiceManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
}