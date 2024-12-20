// components/CategoryList.tsx

'use client';

import useSWR from 'swr';
import { fetcher, deleteCategory } from '@/lib/apiService';
import { useState } from 'react';
import CategoryForm from './categoryForm';

interface Category {
  id: number;
  name: string;
  active: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  active: string;
}

const CategoryList = () => {
  const { data, error, mutate } = useSWR('/api/categories', fetcher);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  if (error) return <div>Error al cargar las categorías.</div>;
  if (!data) return <div>Cargando...</div>;

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await deleteCategory(id);
        mutate();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Categorías</h2>
      <CategoryForm mutate={mutate} />
      <ul>
        {data.map((category: Category) => (
          <li key={category.id}>
            <strong>{category.name}</strong> ({category.active})
            <button onClick={() => setEditingCategory(category)}>Editar</button>
            <button onClick={() => handleDelete(category.id)}>Eliminar</button>
            {category.subcategories.length > 0 && (
              <ul>
                {category.subcategories.map((sub: Subcategory) => (
                  <li key={sub.id}>{sub.name} ({sub.active})</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          mutate={mutate}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
};

export default CategoryList;
