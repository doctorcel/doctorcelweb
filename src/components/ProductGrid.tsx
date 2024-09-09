'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/styles/ProductGrid.module.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch productos desde la API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.product}>
          <img src={product.imageUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};