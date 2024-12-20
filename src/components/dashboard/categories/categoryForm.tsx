// components/CategoryForm.tsx

'use client';

import { useForm } from 'react-hook-form';
import { createCategory, updateCategory } from '@/lib/apiService';
import { useState, useEffect } from 'react';

interface CategoryFormProps {
  category?: {
    id: number;
    name: string;
    active: string;
  };
  mutate: () => void;
  onClose?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, mutate, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: category || { name: '', active: 'ENABLED' },
  });

  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (category) {
        await updateCategory(category.id, data);
        if (onClose) onClose();
      } else {
        await createCategory(data);
      }
      reset();
      mutate();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{category ? 'Editar Categoría' : 'Crear Categoría'}</h3>
      <div>
        <label>Nombre:</label>
        <input
          {...register('name', { required: 'El nombre es requerido' })}
          type="text"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Estado:</label>
        <select {...register('active')}>
          <option value="ENABLED">Habilitado</option>
          <option value="DISABLED">Deshabilitado</option>
        </select>
      </div>
      <button type="submit">{category ? 'Actualizar' : 'Crear'}</button>
      {category && onClose && <button type="button" onClick={onClose}>Cancelar</button>}
    </form>
  );
};

export default CategoryForm;
