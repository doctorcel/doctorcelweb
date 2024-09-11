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
  frontCamera?: string;
  ram?: string;
  storage?: string;
  processor?: string;
  screenSize?: string;
  batteryCapacity?: string;
  imageUrl1?: string;
  imageUrl2?: string;
  imageUrl3?: string;
  imageUrl4?: string;
  Initial?: number;
  price8?: number;
  price12?: number;
  price16?: number;
  brand?: string;
  financialEntity?: string;
  offerPrice?: number;
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
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null);
  const [articleFormData, setArticleFormData] = useState<Article>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    warehouseId: 0,
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
      [name]: name.includes('price') || name === 'categoryId' || name === 'warehouseId' || name === 'Initial' || name === 'offerPrice'
        ? parseFloat(value) || 0 
        : value
    }));
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
        Initial: articleFormData.Initial,
        price8: articleFormData.price8,
        price12: articleFormData.price12,
        price16: articleFormData.price16,
        offerPrice: articleFormData.offerPrice,
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

  const handleWarehouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const url = currentWarehouse ? `/api/warehouses/${currentWarehouse.id}` : '/api/warehouses';
      const method = currentWarehouse ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(warehouseFormData),
      });
      if (!response.ok) throw new Error('Error al guardar la bodega');
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
      const response = await fetch(`/api/warehouses/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Error al eliminar la bodega');
      fetchWarehouses();
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      setError(error instanceof Error ? error.message : 'Error deleting warehouse');
    }
  };

  return (
    <div>
      <h2>Gestión de Artículos y Bodegas</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={() => { setCurrentArticle(null); setIsArticleModalOpen(true); }}>Añadir Artículo</Button>
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
            <th>Marca</th>
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
              <td>{article.brand}</td>
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
          <Input name="brand" value={articleFormData.brand || ''} onChange={handleArticleInputChange} label="Marca" />
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
          <Input name="frontCamera" value={articleFormData.frontCamera || ''} onChange={handleArticleInputChange} label="Cámara Frontal" />
          <Input name="ram" value={articleFormData.ram || ''} onChange={handleArticleInputChange} label="RAM" />
          <Input name="storage" value={articleFormData.storage || ''} onChange={handleArticleInputChange} label="Almacenamiento" />
          <Input name="processor" value={articleFormData.processor || ''} onChange={handleArticleInputChange} label="Procesador" />
          <Input name="screenSize" value={articleFormData.screenSize || ''} onChange={handleArticleInputChange} label="Tamaño de Pantalla" />
          <Input name="batteryCapacity" value={articleFormData.batteryCapacity || ''} onChange={handleArticleInputChange} label="Capacidad de Batería" />

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

          <Input name="Initial" type="number" value={articleFormData.Initial || ''} onChange={handleArticleInputChange} label="Inicial" step="0.01" />
          <Input name="price8" type="number" value={articleFormData.price8 || ''} onChange={handleArticleInputChange} label="Precio 8 meses" step="0.01" />
          <Input name="price12" type="number" value={articleFormData.price12 || ''} onChange={handleArticleInputChange} label="Precio 12 meses" step="0.01" />
          <Input name="price16" type="number" value={articleFormData.price16 || ''} onChange={handleArticleInputChange} label="Precio 16 meses" step="0.01" />
          <Input name="financialEntity" value={articleFormData.financialEntity || ''} onChange={handleArticleInputChange} label="Entidad Financiera" />
          <Input name="offerPrice" type="number" value={articleFormData.offerPrice || ''} onChange={handleArticleInputChange} label="Precio de Oferta" step="0.01" />
          <Button type="submit">{currentArticle ? 'Actualizar' : 'Crear'} Artículo</Button>
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