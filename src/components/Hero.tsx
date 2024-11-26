import React from 'react';
import styles from '@/styles/Hero.module.scss';

export const Hero: React.FC = () => {
  
  return (
    <div className={styles.hero}>
      <h1>Bienvenido a Doctor Cel</h1>
      <p>Tu destino para celulares y accesorios de computadora</p>
      <button>Ver Catálogo</button>
    </div>
  );
};