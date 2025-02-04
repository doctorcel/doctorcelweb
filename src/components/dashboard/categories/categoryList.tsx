// components/CategoryList.tsx
'use client';

import useSWR from 'swr';
import { fetcher, deleteCategory } from '@/lib/apiService';
import { useState } from 'react';
import CategoryForm from './categoryForm';
import Modal from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  active: boolean;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  active: boolean;
}

const CategoryList = () => {
  const { data, error, mutate } = useSWR('/api/categories', fetcher);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await deleteCategory(id);
        mutate();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (error) return (
    <div className="p-4 text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
      Error cargando categorías
    </div>
  );

  if (!data) return (
    <div className="flex justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Categorías</h2>
        <Button
          text="Nueva Categoría"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>

      {data.length === 0 ? (
        <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-400">
          No hay categorías creadas
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((category: Category) => (
            <div key={category.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`inline-block w-3 h-3 rounded-full ${category.active ? 'bg-green-500' : 'bg-red-500'}`} />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {category.name}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  <Button
                    icon={<Edit className="w-4 h-4" />}
                    onClick={() => {
                      setEditingCategory(category);
                      setIsModalOpen(true);
                    }}
                    className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600"
                  />
                  <Button
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                  />
                </div>
              </div>
              
              {category.subcategories.length > 0 && (
                <div className="pl-6 mt-3 space-y-2 border-l-2 border-gray-200 dark:border-gray-600">
                  {category.subcategories.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${sub.active ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-gray-600 dark:text-gray-300">{sub.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
      >
        <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
          {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
        </h3>
        <CategoryForm
    category={editingCategory ?? undefined}
    mutate={mutate}
    onClose={() => {
      setIsModalOpen(false);
      setEditingCategory(null);
    }}
        />
      </Modal>
    </div>
  );
};

export default CategoryList;