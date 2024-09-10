// components/CategoryManagement.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

interface Category {
  id: number;
  name: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('/api/categories');
    if (response.ok) {
      const data = await response.json();
      setCategories(data);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategoryName }),
    });

    if (response.ok) {
      setNewCategoryName('');
      fetchCategories();
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    const response = await fetch('/api/categories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingCategory.id, name: editingCategory.name }),
    });

    if (response.ok) {
      setEditingCategory(null);
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const response = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });

    if (response.ok) {
      fetchCategories();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Categorías</h2>
      
      <form onSubmit={handleCreateCategory} className="mb-4">
        <Input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nueva categoría"
          className="mr-2"
        />
        <Button type="submit">Crear Categoría</Button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category.id} className="mb-2 flex items-center">
            {editingCategory && editingCategory.id === category.id ? (
              <form onSubmit={handleUpdateCategory} className="flex items-center">
                <Input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  className="mr-2"
                />
                <Button type="submit" className="mr-2">Guardar</Button>
                <Button onClick={() => setEditingCategory(null)}>Cancelar</Button>
              </form>
            ) : (
              <>
                <span className="mr-2">{category.name}</span>
                <Button onClick={() => setEditingCategory(category)} className="mr-2">Editar</Button>
                <Button onClick={() => handleDeleteCategory(category.id)}>Eliminar</Button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}