import React from 'react';
import Head from 'next/head';
import styles from '@/styles/Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Doctor Cel</title>
        <meta name="description" content="Tu tienda de celulares y accesorios" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        {/* Agregar navegación aquí */}
      </nav>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Doctor Cel. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};