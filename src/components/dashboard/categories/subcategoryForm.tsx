// components/SubcategoryForm.tsx

'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { createSubcategory, updateSubcategory, fetcher } from '@/lib/apiService';
import useSWR from 'swr';
import { useEffect } from 'react';

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SubcategoryFormData>({
    defaultValues: subcategory ? {
      id: subcategory.id,
      name: subcategory.name,
      active: subcategory.active,
      categoryId: subcategory.category.id,
    } : { name: '', active: 'ENABLED', categoryId: 0 },
  });

  const { data: categories, error: categoriesError } = useSWR('/api/categories', fetcher);

  useEffect(() => {
    if (subcategory) {
      reset({
        id: subcategory.id,
        name: subcategory.name,
        active: subcategory.active,
        categoryId: subcategory.category.id,
      });
    }
  }, [subcategory, reset]);

  const onSubmit: SubmitHandler<SubcategoryFormData> = async (data) => {
    try {
      // Convertir categoryId a número si es necesario
      const formattedData = {
        ...data,
        categoryId: Number(data.categoryId),
      };

      if (subcategory) {
        await updateSubcategory(subcategory.id, formattedData);
        if (onClose) onClose();
      } else {
        await createSubcategory(formattedData);
      }
      reset();
      mutate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (categoriesError) return <div>Error al cargar las categorías.</div>;
  if (!categories) return <div>Cargando categorías...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{subcategory ? 'Editar Subcategoría' : 'Crear Subcategoría'}</h3>
      <div>
        <label>Nombre:</label>
        <input
          {...register('name', { required: 'El nombre es requerido' })}
          type="text"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Categoría:</label>
        <select {...register('categoryId', { required: 'La categoría es requerida' })}>
          <option value="">Seleccione una categoría</option>
          {categories.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {errors.categoryId && <span>{errors.categoryId.message}</span>}
      </div>
      <div>
        <label>Estado:</label>
        <select {...register('active')}>
          <option value="ENABLED">Habilitado</option>
          <option value="DISABLED">Deshabilitado</option>
        </select>
      </div>
      <button type="submit">{subcategory ? 'Actualizar' : 'Crear'}</button>
      {subcategory && onClose && <button type="button" onClick={onClose}>Cancelar</button>}
    </form>
  );
};

export default SubcategoryForm;
