// components/SubcategoryList.tsx

'use client';

import useSWR from 'swr';
import { fetcher, deleteSubcategory } from '@/lib/apiService';
import { useState } from 'react';
import SubcategoryForm from './subcategoryForm';

interface Subcategory {
  id: number;
  name: string;
  active: string;
  category: {
    id: number;
    name: string;
  };
}

const SubcategoryList = () => {
  const { data, error, mutate } = useSWR('/api/subcategories', fetcher);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);

  if (error) return <div>Error al cargar las subcategorías.</div>;
  if (!data) return <div>Cargando...</div>;

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta subcategoría?')) {
      try {
        await deleteSubcategory(id);
        mutate();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <h2>Subcategorías</h2>
      <SubcategoryForm mutate={mutate} />
      <ul>
        {data.map((sub: Subcategory) => (
          <li key={sub.id}>
            <strong>{sub.name}</strong> ({sub.active}) - Categoría: {sub.category.name}
            <button onClick={() => setEditingSubcategory(sub)}>Editar</button>
            <button onClick={() => handleDelete(sub.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {editingSubcategory && (
        <SubcategoryForm
          subcategory={editingSubcategory}
          mutate={mutate}
          onClose={() => setEditingSubcategory(null)}
        />
      )}
    </div>
  );
};

export default SubcategoryList;
