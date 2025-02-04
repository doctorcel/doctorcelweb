// components/SubcategoryForm.tsx
'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { createSubcategory, updateSubcategory, fetcher } from '@/lib/apiService';
import useSWR from 'swr';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button/button';
import { Loader2 } from 'lucide-react';

interface SubcategoryFormData {
  id?: number;
  name: string;
  active: string;
  categoryId: number;
}

interface SubcategoryFormProps {
  subcategory?: {
    id: number;
    name: string;
    active: string;
    category: {
      id: number;
      name: string;
    };
  };
  mutate: () => void;
  onClose?: () => void;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({ subcategory, mutate, onClose }) => {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<SubcategoryFormData>({
    defaultValues: {
      name: '',
      active: 'ENABLED',
      categoryId: 0,
      ...subcategory,
    }
  });

  const { data: categories, error: categoriesError, isLoading } = useSWR(
    '/api/categories', 
    fetcher
  );

  useEffect(() => {
    if (subcategory) {
      reset({
        ...subcategory,
      });
    }
  }, [subcategory, reset]);

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    try {
      const formattedData = {
        ...data,
        categoryId: Number(data.categoryId)
      };

      if (subcategory) {
        await updateSubcategory(subcategory.id, formattedData);
      } else {
        await createSubcategory(formattedData);
      }
      mutate();
      onClose?.();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (isLoading) return (
    <div className="flex justify-center p-8">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    </div>
  );

  if (categoriesError) return (
    <div className="p-4 text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
      Error cargando categorías
    </div>
  );

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
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Categoría
          </label>
          <select
            {...register('categoryId', { 
              required: 'La categoría es requerida',
              validate: value => value !== 0 || 'Seleccione una categoría'
            })}
            className={`w-full p-2 border rounded-md bg-white dark:bg-gray-700 ${
              errors.categoryId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
          >
            <option value={0}>Seleccione una categoría</option>
            {categories?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1 dark:text-red-400">
              {errors.categoryId.message}
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
          text={subcategory ? 'Actualizar' : 'Crear'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : undefined}
        />
      </div>
    </form>
  );
};

export default SubcategoryForm;