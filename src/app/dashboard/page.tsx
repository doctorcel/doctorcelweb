import React from 'react';
import { InvoiceManagement } from '@/components/dashboard/InvoiceManagement';
import { TechServiceManagement } from '@/components/dashboard/TechServiceManagement';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import styles from '@/styles/dashboard/Dashboard.module.scss';
import UserManagement from '@/components/dashboard/UserManagement';
import CategoryManagement from '@/components/dashboard/CategoryManagement';
import ProductManagement from '@/components/dashboard/ProductManagement';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-green-600 dark:text-green-400">Panel de Administración</h1>
        <div className={styles.modules}>
          <ProductManagement />
          <CategoryManagement />
          <UserManagement/>
          <InvoiceManagement />
          <TechServiceManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
}