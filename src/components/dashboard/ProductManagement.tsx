'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/ProductManagement.module.scss';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  // Añade más propiedades según sea necesario
}

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Aquí iría la lógica para cargar los productos desde la API
    // Por ahora, usaremos datos de ejemplo
    setProducts([
      { id: 1, name: 'Smartphone X', description: 'Un gran teléfono', price: 599, category: 'Celulares' },
      { id: 2, name: 'Tablet Y', description: 'Tablet potente', price: 399, category: 'Tablets' },
    ]);
  }, []);

  return (
    <div className={styles.productManagement}>
      <h2>Gestión de Productos</h2>
      <button className={styles.addButton}>Añadir Producto</button>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button className={styles.editButton}>Editar</button>
                <button className={styles.deleteButton}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};