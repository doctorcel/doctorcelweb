import React from 'react';
import { Layout } from '@/components/Layout';
import { ProductManagement } from '@/components/dashboard/ProductManagement';
import { InvoiceManagement } from '@/components/dashboard/InvoiceManagement';
import { TechServiceManagement } from '@/components/dashboard/TechServiceManagement';
import styles from '@/styles/Dashboard.module.scss';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div className={styles.dashboard}>
        <h1>Panel de Administración</h1>
        <div className={styles.modules}>
          <ProductManagement />
          <InvoiceManagement />
          <TechServiceManagement />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;