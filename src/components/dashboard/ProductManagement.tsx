'use client'
import React, { useState, useEffect } from 'react';
import { Button, Input, Select, Modal } from '../ui/UiComponents';
import { CldImage } from 'next-cloudinary';

interface Article {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  warehouseId: number;
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

interface Warehouse {
  id?: number;
  name: string;
  description?: string;
}

export const ProductManagement: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [articleFormData, setArticleFormData] = useState<Article>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    warehouseId: 0,
  });
  const [categoryFormData, setCategoryFormData] = useState<Category>({
    name: '',
  });
  const [warehouseFormData, setWarehouseFormData] = useState<Warehouse>({
    name: '',
    description: '',
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
    fetchWarehouses();
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
        warehouseId: 0,
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

  useEffect(() => {
    if (currentWarehouse) {
      setWarehouseFormData(currentWarehouse);
    } else {
      setWarehouseFormData({
        name: '',
        description: '',
      });
    }
  }, [currentWarehouse]);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchArticles = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar los artículos');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error instanceof Error ? error.message : 'Error fetching articles');
    }
  };

  const fetchCategories = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar las categorías');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error instanceof Error ? error.message : 'Error fetching categories');
    }
  };

  const fetchWarehouses = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/warehouses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al cargar las bodegas');
      const data = await response.json();
      setWarehouses(data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
      setError(error instanceof Error ? error.message : 'Error fetching warehouses');
    }
  };

  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setArticleFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name === 'categoryId' || name === 'warehouseId' ? parseFloat(value) || 0 : value
    }));
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWarehouseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWarehouseFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Article) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setUploadError(null);
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
  
      const data = await response.json();
      if (data.success) {
        setArticleFormData(prev => ({ ...prev, [fieldName]: data.result.secure_url }));
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const dataToSend = {
        ...articleFormData,
        price: parseFloat(articleFormData.price.toString()),
        categoryId: parseInt(articleFormData.categoryId.toString(), 10),
        warehouseId: parseInt(articleFormData.warehouseId.toString(), 10),
        price4Months: articleFormData.price4Months ? parseFloat(articleFormData.price4Months.toString()) : undefined,
        price8Months: articleFormData.price8Months ? parseFloat(articleFormData.price8Months.toString()) : undefined,
        price12Months: articleFormData.price12Months ? parseFloat(articleFormData.price12Months.toString()) : undefined,
        price16Months: articleFormData.price16Months ? parseFloat(articleFormData.price16Months.toString()) : undefined,
      };

      let url = '/api/articles';
      let method = 'POST';

      if (currentArticle) {
        url = `/api/articles?id=${currentArticle.id}`;
        method = 'PATCH';
        dataToSend.id = currentArticle.id;
      }

      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Error al guardar el artículo');
      setIsArticleModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error('Error saving article:', error);
      setError(error instanceof Error ? error.message : 'Error saving article');
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const url = currentCategory ? `/api/categories/${currentCategory.id}` : '/api/categories';
      const method = currentCategory ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(categoryFormData),
      });
      if (!response.ok) throw new Error('Error al guardar la categoría');
      setIsCategoryModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      setError(error instanceof Error ? error.message : 'Error saving category');
    }
  };

  const handleWarehouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      let url = '/api/warehouses';
      let method = 'POST';
  
      if (currentWarehouse) {
        url = `/api/warehouses?id=${currentWarehouse.id}`;
        method = 'PATCH';
      }
  
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(warehouseFormData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la bodega');
      }
  
      setIsWarehouseModalOpen(false);
      fetchWarehouses();
    } catch (error) {
      console.error('Error saving warehouse:', error);
      setError(error instanceof Error ? error.message : 'Error saving warehouse');
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(`/api/articles?id=${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error('Error al eliminar el artículo');
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
      setError(error instanceof Error ? error.message : 'Error deleting article');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(`/api/categories/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al eliminar la categoría');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      setError(error instanceof Error ? error.message : 'Error deleting category');
    }
  };

  const handleDeleteWarehouse = async (id: number) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch(`/api/warehouses?id=${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar la bodega');
      }
      fetchWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      setError(error instanceof Error ? error.message : 'Error deleting warehouse');
    }
  };

  return (
    <div>
      <h2>Gestión de Artículos, Categorías y Bodegas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={() => { setCurrentArticle(null); setIsArticleModalOpen(true); }}>Añadir Artículo</Button>
      <Button onClick={() => { setCurrentCategory(null); setIsCategoryModalOpen(true); }}>Añadir Categoría</Button>
      <Button onClick={() => { setCurrentWarehouse(null); setIsWarehouseModalOpen(true); }}>Añadir Bodega</Button>

      <h3>Artículos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Bodega</th>
            <th>Imagen</th>
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
              <td>{warehouses.find(w => w.id === article.warehouseId)?.name}</td>
              <td>
                {article.imageUrl1 && (
                  <CldImage
                    width="100"
                    height="100"
                    src={article.imageUrl1}
                    alt={article.name}
                  />
                )}
              </td>
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

      <h3>Bodegas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.name}</td>
              <td>{warehouse.description}</td>
              <td>
                <Button onClick={() => { setCurrentWarehouse(warehouse); setIsWarehouseModalOpen(true); }}>Editar</Button>
                <Button onClick={() => handleDeleteWarehouse(warehouse.id!)}>Eliminar</Button>
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
          <Select
            name="warehouseId"
            value={articleFormData.warehouseId}
            onChange={handleArticleInputChange}
            label="Bodega"
            options={warehouses.map(w => ({ value: w.id!, label: w.name }))}
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
                onChange={(e) => handleImageUpload(e, field as keyof Article)}
                accept="image/*"
              />
              {articleFormData[field as keyof Article] && (
                <CldImage
                  width="100"
                  height="100"
                  src={articleFormData[field as keyof Article] as string}
                  alt={`Imagen ${index + 1}`}
                />
              )}
            </div>
          ))}

          {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}

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

      <Modal isOpen={isWarehouseModalOpen} onClose={() => { setIsWarehouseModalOpen(false); setCurrentWarehouse(null); }}>
        <form onSubmit={handleWarehouseSubmit}>
          <Input name="name" value={warehouseFormData.name} onChange={handleWarehouseInputChange} label="Nombre de la bodega" required />
          <Input name="description" value={warehouseFormData.description || ''} onChange={handleWarehouseInputChange} label="Descripción de la bodega" />
          <Button type="submit">{currentWarehouse ? 'Actualizar' : 'Crear'} Bodega</Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagement;                