// components/CategoryForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { createCategory, updateCategory } from '@/lib/apiService';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button/button';
import { Loader2 } from 'lucide-react';

interface CategoryFormProps {
  category?: {
    id: number;
    name: string;
    active: boolean;
  };
  mutate: () => void;
  onClose?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, mutate, onClose }) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm({
    defaultValues: category || { name: '', active: true },
  });

  useEffect(() => {
    if (category) reset(category);
  }, [category, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (category) {
        await updateCategory(category.id, data);
      } else {
        await createCategory(data);
      }
      mutate();
      onClose?.();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <input
            {...register('name', { required: 'El nombre es requerido' })}
            type="text"
            className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 ${
              errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 dark:text-red-400">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Estado
          </label>
          <select
            {...register('active')}
            className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          >
            <option value="ENABLED">Habilitado</option>
            <option value="DISABLED">Deshabilitado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        {onClose && (
          <Button
            type="button"
            text="Cancelar"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
          />
        )}
        <Button
          type="submit"
          text={category ? 'Actualizar' : 'Crear'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : undefined}
        />
      </div>
    </form>
  );
};

export default CategoryForm;