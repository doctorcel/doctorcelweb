import React from 'react';
import { SearchBar } from '@/components/SearchBar';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import styles from '@/styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <main>
        <Hero />
        <section className={styles.featuredProducts}>
          <h2>Productos Destacados</h2>
          <ProductGrid />
        </section>
      </main>
    </div>
  );
};

export default Home;