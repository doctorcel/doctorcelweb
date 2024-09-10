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

  // ... (mantener los useEffect para articles y warehouses)

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchArticles = async () => {
    // ... (mantener como está)
  };

  const fetchCategories = async () => {
    // ... (mantener como está, solo para obtener la lista de categorías)
  };

  const fetchWarehouses = async () => {
    // ... (mantener como está)
  };

  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    // ... (mantener como está)
  };

  const handleWarehouseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... (mantener como está)
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Article) => {
    // ... (mantener como está)
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    // ... (mantener como está)
  };

  const handleWarehouseSubmit = async (e: React.FormEvent) => {
    // ... (mantener como está)
  };

  const handleDeleteArticle = async (id: number) => {
    // ... (mantener como está)
  };

  const handleDeleteWarehouse = async (id: number) => {
    // ... (mantener como está)
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
          {/* ... (mantener los campos del formulario de artículo) */}
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