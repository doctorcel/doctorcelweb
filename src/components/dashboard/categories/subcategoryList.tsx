// components/SubcategoryList.tsx
'use client';

import useSWR from 'swr';
import { fetcher, deleteSubcategory } from '@/lib/apiService';
import { useState } from 'react';
import SubcategoryForm from './subcategoryForm';
import Modal from '@/components/ui/modal/modal';
import { Button } from '@/components/ui/button/button';
import { Loader2, Plus, Edit, Trash2 } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta subcategoría?')) {
      try {
        await deleteSubcategory(id);
        mutate();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (error) return (
    <div className="p-4 text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
      Error cargando subcategorías
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
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Subcategorías</h2>
        <Button
          text="Nueva Subcategoría"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>

      {data.length === 0 ? (
        <div className="p-4 text-center text-gray-500 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-400">
          No hay subcategorías creadas
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((sub: Subcategory) => (
            <div key={sub.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex items-center space-x-4">
                <span className={`inline-block w-3 h-3 rounded-full ${sub.active ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <span className="block font-medium text-gray-800 dark:text-white">{sub.name}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => {
                    setEditingSubcategory(sub);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600"
                />
                <Button
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(sub.id)}
                  className="p-2 text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSubcategory(null);
        }}
      >
        <h3 className="mb-6 text-xl font-bold text-gray-800 dark:text-white">
          {editingSubcategory ? 'Editar Subcategoría' : 'Nueva Subcategoría'}
        </h3>
        <SubcategoryForm
          subcategory={editingSubcategory || undefined}
          mutate={mutate}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSubcategory(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default SubcategoryList;