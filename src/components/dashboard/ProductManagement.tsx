'use client'

import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Modal } from '../ui/UiComponents';

interface Article {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  camera?: string;
  ram?: string;
  storage?: string;
  processor?: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  price4Months?: number;
  price8Months?: number;
  price12Months?: number;
  price16Months?: number;
}

interface Category {
  id?: number;
  name: string;
}

export const ProductManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [articleFormData, setArticleFormData] = useState<Article>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
  });
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    name: '',
  });

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (currentArticle) {
      setArticleFormData(currentArticle);
    } else {
      setArticleFormData({
        name: '',
        description: '',
        price: 0,
        categoryId: 0,
      });
    }
  }, [currentArticle]);

  useEffect(() => {
    if (currentCategory) {
      setCategoryFormData(currentCategory);
    } else {
      setCategoryFormData({
        name: '',
      });
    }
  }, [currentCategory]);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('Error al cargar los artículos');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Error al cargar las categorías');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticleFormData(prev => ({ 
      ...prev, 
      [name]: name.includes('price') ? parseFloat(value) || 0 : value 
    }));
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...articleFormData,
        price: parseFloat(articleFormData.price.toString()),
        price4Months: articleFormData.price4Months ? parseFloat(articleFormData.price4Months.toString()) : undefined,
        price8Months: articleFormData.price8Months ? parseFloat(articleFormData.price8Months.toString()) : undefined,
        price12Months: articleFormData.price12Months ? parseFloat(articleFormData.price12Months.toString()) : undefined,
        price16Months: articleFormData.price16Months ? parseFloat(articleFormData.price16Months.toString()) : undefined,
        categoryId: parseInt(articleFormData.categoryId.toString(), 10)
      };

      let url = '/api/articles';
      let method = 'POST';

      if (currentArticle) {
        url = `/api/articles?id=${currentArticle.id}`; // Añadimos el ID como parámetro de consulta
        method = 'PATCH';
        dataToSend.id = currentArticle.id; // Incluimos el ID en el cuerpo de la solicitud
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Error al guardar el artículo');
      setIsArticleModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = currentCategory ? `/api/categories/${currentCategory.id}` : '/api/categories';
      const method = currentCategory ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryFormData),
      });
      if (!response.ok) throw new Error('Error al guardar la categoría');
      setIsCategoryModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      const response = await fetch(`/api/articles?id=${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Error al eliminar el artículo');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar la categoría');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Article) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      setArticleFormData(prev => ({ ...prev, [fieldName]: data.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <h2>Gestión de Artículos y Categorías</h2>
      <Button onClick={() => { setCurrentArticle(null); setIsArticleModalOpen(true); }}>Añadir Artículo</Button>
      <Button onClick={() => { setCurrentCategory(null); setIsCategoryModalOpen(true); }}>Añadir Categoría</Button>
      
      <h3>Artículos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>{article.name}</td>
              <td>{article.description}</td>
              <td>{article.price}</td>
              <td>{categories.find(c => c.id === article.categoryId)?.name}</td>
              <td>
                <Button onClick={() => { setCurrentArticle(article); setIsArticleModalOpen(true); }}>Editar</Button>
                <Button onClick={() => handleDeleteArticle(article.id!)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Categorías</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <Button onClick={() => { setCurrentCategory(category); setIsCategoryModalOpen(true); }}>Editar</Button>
                <Button onClick={() => handleDeleteCategory(category.id!)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isArticleModalOpen} onClose={() => { setIsArticleModalOpen(false); setCurrentArticle(null); }}>
        <form onSubmit={handleArticleSubmit}>
          <Input name="name" value={articleFormData.name} onChange={handleArticleInputChange} label="Nombre" required />
          <Input name="description" value={articleFormData.description} onChange={handleArticleInputChange} label="Descripción" required />
          <Input name="price" type="number" value={articleFormData.price} onChange={handleArticleInputChange} label="Precio" required step="0.01" />
          <Select 
            name="categoryId"
            value={articleFormData.categoryId}
            onChange={handleArticleInputChange}
            label="Categoría" 
            options={categories.map(c => ({ value: c.id!, label: c.name }))} 
            required
          />
          <Input name="camera" value={articleFormData.camera || ''} onChange={handleArticleInputChange} label="Cámara" />
          <Input name="ram" value={articleFormData.ram || ''} onChange={handleArticleInputChange} label="RAM" />
          <Input name="storage" value={articleFormData.storage || ''} onChange={handleArticleInputChange} label="Almacenamiento" />
          <Input name="processor" value={articleFormData.processor || ''} onChange={handleArticleInputChange} label="Procesador" />
          
          {['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4'].map((field, index) => (
            <div key={field}>
              <Input 
                name={field}
                value={articleFormData[field as keyof Article] || ''}
                onChange={handleArticleInputChange}
                label={`URL de imagen ${index + 1}`} 
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(e, field as keyof Article)}
              />
            </div>
          ))}
          
          <Input name="price4Months" type="number" value={articleFormData.price4Months || ''} onChange={handleArticleInputChange} label="Precio 4 meses" step="0.01" />
          <Input name="price8Months" type="number" value={articleFormData.price8Months || ''} onChange={handleArticleInputChange} label="Precio 8 meses" step="0.01" />
          <Input name="price12Months" type="number" value={articleFormData.price12Months || ''} onChange={handleArticleInputChange} label="Precio 12 meses" step="0.01" />
          <Input name="price16Months" type="number" value={articleFormData.price16Months || ''} onChange={handleArticleInputChange} label="Precio 16 meses" step="0.01" />
          <Button type="submit">{currentArticle ? 'Actualizar' : 'Crear'} Artículo</Button>
        </form>
      </Modal>

      <Modal isOpen={isCategoryModalOpen} onClose={() => { setIsCategoryModalOpen(false); setCurrentCategory(null); }}>
        <form onSubmit={handleCategorySubmit}>
          <Input name="name" value={categoryFormData.name} onChange={handleCategoryInputChange} label="Nombre de la categoría" required />
          <Button type="submit">{currentCategory ? 'Actualizar' : 'Crear'} Categoría</Button>
        </form>
      </Modal>
    </div>
  );
};