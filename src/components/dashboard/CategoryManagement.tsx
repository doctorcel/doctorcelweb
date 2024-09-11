'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Aquí podrías establecer un estado de error para mostrarlo en la UI
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

  const handleCreateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) return;

    const response = await fetch('/api/subcategories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newSubcategoryName, categoryId: selectedCategoryId }),
    });

    if (response.ok) {
      setNewSubcategoryName('');
      fetchCategories();
    }
  };

  const handleUpdateSubcategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubcategory) return;

    const response = await fetch('/api/subcategories', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingSubcategory.id, name: editingSubcategory.name }),
    });

    if (response.ok) {
      setEditingSubcategory(null);
      fetchCategories();
    }
  };

  const handleDeleteSubcategory = async (id: number) => {
    const response = await fetch(`/api/subcategories?id=${id}`, { method: 'DELETE' });

    if (response.ok) {
      fetchCategories();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gestión de Categorías y Subcategorías</h2>
      
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
          <li key={category.id} className="mb-4">
            <div className="flex items-center mb-2">
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
                  <span className="mr-2 font-bold">{category.name}</span>
                  <Button onClick={() => setEditingCategory(category)} className="mr-2">Editar</Button>
                  <Button onClick={() => handleDeleteCategory(category.id)}>Eliminar</Button>
                </>
              )}
            </div>
            <div className="ml-4">
              <h4 className="font-semibold mb-2">Subcategorías:</h4>
              <ul>
                {category.subcategories && category.subcategories.map((subcategory) => (
                  <li key={subcategory.id} className="flex items-center mb-2">
                    {editingSubcategory && editingSubcategory.id === subcategory.id ? (
                      <form onSubmit={handleUpdateSubcategory} className="flex items-center">
                        <Input
                          type="text"
                          value={editingSubcategory.name}
                          onChange={(e) => setEditingSubcategory({ ...editingSubcategory, name: e.target.value })}
                          className="mr-2"
                        />
                        <Button type="submit" className="mr-2">Guardar</Button>
                        <Button onClick={() => setEditingSubcategory(null)}>Cancelar</Button>
                      </form>
                    ) : (
                      <>
                        <span className="mr-2">{subcategory.name}</span>
                        <Button onClick={() => setEditingSubcategory(subcategory)} className="mr-2">Editar</Button>
                        <Button onClick={() => handleDeleteSubcategory(subcategory.id)}>Eliminar</Button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <form onSubmit={handleCreateSubcategory} className="mt-2">
                <Input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="Nueva subcategoría"
                  className="mr-2"
                />
                <Button type="submit" onClick={() => setSelectedCategoryId(category.id)}>Añadir Subcategoría</Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}