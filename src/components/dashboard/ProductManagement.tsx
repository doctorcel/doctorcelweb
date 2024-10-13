'use client'

import React, { useState, useEffect } from 'react'
import { CldImage } from 'next-cloudinary'
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react'
import Swal from 'sweetalert2'

interface Article {
  id?: number
  name: string
  description: string
  price: number
  categoryId: number
  warehouseId: number
  camera?: string
  frontCamera?: string
  ram?: string
  storage?: string
  processor?: string
  screenSize?: string
  batteryCapacity?: string
  imageUrl1?: string
  imageUrl2?: string
  imageUrl3?: string
  imageUrl4?: string
  Initial?: number
  price8?: number
  price12?: number
  price16?: number
  brand?: string
  financialEntity?: string
  offerPrice?: number
}

interface Category {
  id?: number
  name: string
}

interface Warehouse {
  id?: number
  name: string
  description?: string
}

export default function ProductManagement() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [warehouses, setWarehouses] = useState<Warehouse[]>([])
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)
  const [isWarehouseModalOpen, setIsWarehouseModalOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [currentWarehouse, setCurrentWarehouse] = useState<Warehouse | null>(null)
  const [articleFormData, setArticleFormData] = useState<Article>({
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    warehouseId: 0,
  })
  const [warehouseFormData, setWarehouseFormData] = useState<Warehouse>({
    name: '',
    description: '',
  })
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [sortField, setSortField] = useState<keyof Article>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchArticles()
    fetchCategories()
    fetchWarehouses()
  }, [])

  useEffect(() => {
    if (currentArticle) {
      setArticleFormData(currentArticle)
    } else {
      setArticleFormData({
        name: '',
        description: '',
        price: 0,
        categoryId: 0,
        warehouseId: 0,
      })
    }
  }, [currentArticle])

  useEffect(() => {
    if (currentWarehouse) {
      setWarehouseFormData(currentWarehouse)
    } else {
      setWarehouseFormData({
        name: '',
        description: '',
      })
    }
  }, [currentWarehouse])

  const getToken = () => {
    return localStorage.getItem('token')
  }

  const fetchArticles = async () => {
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch('/api/articles', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Error al cargar los artículos')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error('Error fetching articles:', error)
      setError(error instanceof Error ? error.message : 'Error fetching articles')
    }
  }

  const fetchCategories = async () => {
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch('/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Error al cargar las categorías')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError(error instanceof Error ? error.message : 'Error fetching categories')
    }
  }

  const fetchWarehouses = async () => {
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch('/api/warehouses', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Error al cargar las bodegas')
      const data = await response.json()
      setWarehouses(data)
    } catch (error) {
      console.error('Error fetching warehouses:', error)
      setError(error instanceof Error ? error.message : 'Error fetching warehouses')
    }
  }
  const handleArticleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setArticleFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name === 'categoryId' || name === 'warehouseId' || name === 'Initial' || name === 'offerPrice'
        ? parseFloat(value) || 0
        : value
    }))
  }

  const handleWarehouseInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setWarehouseFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Article) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploadError(null)
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to upload image')
      }

      const data = await response.json()
      if (data.success) {
        setArticleFormData(prev => ({ ...prev, [fieldName]: data.result.secure_url }))
      } else {
        throw new Error(data.error || 'Unknown error occurred')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setUploadError(error instanceof Error ? error.message : 'An unknown error occurred')
    }
  }

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
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
      }

      let url = '/api/articles'
      let method = 'POST'

      if (currentArticle) {
        url = `/api/articles?id=${currentArticle.id}`
        method = 'PATCH'
        dataToSend.id = currentArticle.id
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error('Error al guardar el artículo')
      setIsArticleModalOpen(false)
      fetchArticles()
    } catch (error) {
      console.error('Error saving article:', error)
      setError(error instanceof Error ? error.message : 'Error saving article')
    }
  }

  const handleWarehouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const url = currentWarehouse ? `/api/warehouses/${currentWarehouse.id}` : '/api/warehouses'
      const method = currentWarehouse ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(warehouseFormData),
      })
      if (!response.ok) throw new Error('Error al guardar la bodega')
      setIsWarehouseModalOpen(false)
      fetchWarehouses()
    } catch (error) {
      console.error('Error saving warehouse:', error)
      setError(error instanceof Error ? error.message : 'Error saving warehouse')
    }
  }

  const handleDeleteWarehouse = async (id: number) => {
    try {
      const token = getToken()
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch(`/api/warehouses/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error('Error al eliminar la bodega')
      fetchWarehouses()
    } catch (error) {
      console.error('Error deleting warehouse:', error)
      setError(error instanceof Error ? error.message : 'Error deleting warehouse')
    }
  }
  const handleDeleteArticle = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    })

    if (result.isConfirmed) {
      try {
        const token = getToken()
        if (!token) {
          throw new Error('No authentication token found')
        }
        const response = await fetch(`/api/articles?id=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        if (!response.ok) throw new Error('Error al eliminar el artículo')
        fetchArticles()
        Swal.fire(
          'Eliminado!',
          'El artículo ha sido eliminado.',
          'success'
        )
      } catch (error) {
        console.error('Error deleting article:', error)
        setError(error instanceof Error ? error.message : 'Error deleting article')
        Swal.fire(
          'Error!',
          'No se pudo eliminar el artículo.',
          'error'
        )
      }
    }
  }

  const handleSort = (field: keyof Article) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredArticles = articles.filter(article =>
    article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
  
    // Manejar casos donde los valores pueden ser undefined
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
    if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;
  
    // Comparación basada en el tipo de dato
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }
  
    // Para otros tipos de datos, convertir a string y comparar
    const aString = String(aValue);
    const bString = String(bValue);
    
    return sortDirection === 'asc'
      ? aString.localeCompare(bString)
      : bString.localeCompare(aString);
  });

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentArticles = sortedArticles.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-green-600 dark:text-green-400">
        Gestión de Artículos y Bodegas
      </h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => { setCurrentArticle(null); setIsArticleModalOpen(true); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Añadir Artículo
        </button>
        <button
          onClick={() => { setCurrentWarehouse(null); setIsWarehouseModalOpen(true); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Añadir Bodega
        </button>
      </div>

      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto m-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {currentArticle ? 'Editar Artículo' : 'Añadir Artículo'}
            </h3>
            <form onSubmit={handleArticleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <input
                  name="name"
                  value={articleFormData.name}
                  onChange={handleArticleInputChange}
                  placeholder="Nombre"
                  required
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  name="description"
                  value={articleFormData.description}
                  onChange={handleArticleInputChange}
                  placeholder="Descripción"
                  required
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
                <input
                  name="price"
                  type="number"
                  value={articleFormData.price}
                  onChange={handleArticleInputChange}
                  placeholder="Precio"
                  required
                  step="0.01"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="brand"
                  value={articleFormData.brand || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Marca"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <select
                  name="categoryId"
                  value={articleFormData.categoryId}
                  onChange={handleArticleInputChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select
                  name="warehouseId"
                  value={articleFormData.warehouseId}
                  onChange={handleArticleInputChange}
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Selecciona una bodega</option>
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-4">
                <input
                  name="camera"
                  value={articleFormData.camera || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Cámara"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="frontCamera"
                  value={articleFormData.frontCamera || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Cámara Frontal"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="ram"
                  value={articleFormData.ram || ''}
                  onChange={handleArticleInputChange}
                  placeholder="RAM"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="storage"
                  value={articleFormData.storage || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Almacenamiento"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="processor"
                  value={articleFormData.processor || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Procesador"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="screenSize"
                  value={articleFormData.screenSize || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Tamaño de Pantalla"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-4">
                <input
                  name="batteryCapacity"
                  value={articleFormData.batteryCapacity || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Capacidad de Batería"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4'].map((field, index) => (
                  <div key={field} className="space-y-2">
                    <input
                      name={field}
                      value={articleFormData[field as keyof Article] || ''}
                      onChange={handleArticleInputChange}
                      placeholder={`URL de imagen ${index + 1}`}
                      className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="file"
                      onChange={(e) => handleImageUpload(e, field as keyof Article)}
                      accept="image/*"
                      className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    {articleFormData[field as keyof Article] && (
                      <CldImage
                        width="100"
                        height="100"
                        src={articleFormData[field as keyof Article] as string}
                        alt={`Imagen ${index + 1}`}
                        className="mt-2 rounded-md"
                      />
                    )}
                  </div>
                ))}
                {uploadError && <p className="text-red-500 dark:text-red-400">{uploadError}</p>}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="Initial"
                    type="number"
                    value={articleFormData.Initial || ''}
                    onChange={handleArticleInputChange}
                    placeholder="Inicial"
                    step="0.01"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    name="price8"
                    type="number"
                    value={articleFormData.price8 || ''}
                    onChange={handleArticleInputChange}
                    placeholder="Precio 8 meses"
                    step="0.01"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    name="price12"
                    type="number"
                    value={articleFormData.price12 || ''}
                    onChange={handleArticleInputChange}
                    placeholder="Precio 12 meses"
                    step="0.01"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    name="price16"
                    type="number"
                    value={articleFormData.price16 || ''}
                    onChange={handleArticleInputChange}
                    placeholder="Precio 16 meses"
                    step="0.01"
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <input
                  name="financialEntity"
                  value={articleFormData.financialEntity || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Entidad Financiera"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  name="offerPrice"
                  type="number"
                  value={articleFormData.offerPrice || ''}
                  onChange={handleArticleInputChange}
                  placeholder="Precio de Oferta"
                  step="0.01"
                  className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  {currentArticle ? 'Actualizar' : 'Crear'} Artículo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isWarehouseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {currentWarehouse ? 'Editar Bodega' : 'Añadir Bodega'}
            </h3>
            <form onSubmit={handleWarehouseSubmit} className="space-y-4">
              <input
                name="name"
                value={warehouseFormData.name}
                onChange={handleWarehouseInputChange}
                placeholder="Nombre de la bodega"
                required
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <textarea
                name="description"
                value={warehouseFormData.description || ''}
                onChange={handleWarehouseInputChange}
                placeholder="Descripción de la bodega"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                rows={3}
              />
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsWarehouseModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  {currentWarehouse ? 'Actualizar' : 'Crear'} Bodega
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Artículos</h3>
          <div className="overflow-x-auto">
            <div className="space-y-8">
              <div>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full bg-white dark:bg-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                          Nombre {sortField === 'name' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                        </th>
                        <th onClick={() => handleSort('price')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                          Precio {sortField === 'price' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                        </th>
                        <th onClick={() => handleSort('categoryId')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                          Categoría {sortField === 'categoryId' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                        </th>
                        <th onClick={() => handleSort('brand')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer">
                          Marca {sortField === 'brand' && (sortDirection === 'asc' ? <ArrowUp className="inline h-4 w-4" /> : <ArrowDown className="inline h-4 w-4" />)}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Imagen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {currentArticles.map((article) => (
                        <tr key={article.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{article.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{article.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{categories.find(c => c.id === article.categoryId)?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{article.brand}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {article.imageUrl1 && (
                              <CldImage
                                width="100"
                                height="100"
                                src={article.imageUrl1}
                                alt={article.name}
                                className="rounded-md"
                              />
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => { setCurrentArticle(article); setIsArticleModalOpen(true); }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(article.id!)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  {Array.from({ length: Math.ceil(sortedArticles.length / itemsPerPage) }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-white text-green-500'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>


              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Bodegas</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {warehouses.map((warehouse) => (
                        <tr key={warehouse.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{warehouse.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{warehouse.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => { setCurrentWarehouse(warehouse); setIsWarehouseModalOpen(true); }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteWarehouse(warehouse.id!)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
}