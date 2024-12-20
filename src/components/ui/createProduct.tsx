// components/ui/createProduct.tsx

'use client';
import React, { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import { useSession } from "next-auth/react";
import {
  getSubcategoriesByCategory,
  getCategories,
  getWarehouses,
  fetcher,
} from "@/lib/apiService";

interface CreateProductProps {
  onProductCreated: () => void;
}

interface Article {
  id?: number;
  name: string;
  description: string;
  price: number | string;
  cost: number | string;
  categoryId: number;
  warehouseId: number;
  subcategoryId?: number;
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
  
  [key: string]: any;
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

const ramOptions = ["2GB", "4GB", "8GB", "16GB", "32GB"];
const storageOptions = [
  "4GB",
  "8GB",
  "16GB",
  "32GB",
  "64GB",
  "128GB",
  "256GB",
  "512GB",
  "1TB",
  "2TB",
];

export default function CreateProduct({ onProductCreated }: CreateProductProps) {
  const { data: session, status } = useSession();
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [subcategories, setSubcategories] = useState<{ id: number; name: string }[]>([]);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [articleFormData, setArticleFormData] = useState<Article>({
    name: "",
    description: "",
    ram: "",
    storage: "",
    price: "",
    cost: "",
    categoryId: 0,
    warehouseId: 0,
    subcategoryId: undefined,
  });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubcategoriesLoading, setIsSubcategoriesLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetchArticles();
      fetchCategories();
      fetchWarehouses();
    }
  }, [status]);

  useEffect(() => {
    if (currentArticle) {
      setArticleFormData(currentArticle);
    } else {
      setArticleFormData({
        name: "",
        description: "",
        price: "",
        cost: "",
        categoryId: 0,
        warehouseId: 0,
        subcategoryId: undefined,
      });
    }
  }, [currentArticle]);

  useEffect(() => {
    if (articleFormData.categoryId) {
      fetchSubcategories(articleFormData.categoryId);
    } else {
      setSubcategories([]);
      setArticleFormData((prev) => ({
        ...prev,
        subcategoryId: undefined,
      }));
    }
  }, [articleFormData.categoryId]);

  const fetchArticles = async () => {
    try {
      const data = await fetcher("/api/articles");
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching articles"
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching categories"
      );
    }
  };

  const fetchWarehouses = async () => {
    try {
      const data = await getWarehouses();
      setWarehouses(data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching warehouses"
      );
    }
  };

  const fetchSubcategories = async (categoryId: number) => {
    try {
      setIsSubcategoriesLoading(true);
      const data = await getSubcategoriesByCategory(categoryId);
      setSubcategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching subcategories"
      );
    } finally {
      setIsSubcategoriesLoading(false);
    }
  };

  const handleArticleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setArticleFormData((prev) => ({
      ...prev,
      [name]:
        name.includes("price") ||
        name === "categoryId" ||
        name === "warehouseId" ||
        name === "Initial" ||
        name === "offerPrice" ||
        name === "subcategoryId"
          ? value
            ? parseFloat(value)
            : undefined
          : value,
    }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Article
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadError(null);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload image");
      }

      const data = await response.json();
      if (data.success) {
        setArticleFormData((prev) => ({
          ...prev,
          [fieldName]: data.result.secure_url,
        }));
      } else {
        throw new Error(data.error || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...articleFormData,
        price: parseFloat(articleFormData.price.toString()),
        cost: parseFloat(articleFormData.cost.toString()),
        categoryId: parseInt(articleFormData.categoryId.toString(), 10),
        warehouseId: parseInt(articleFormData.warehouseId.toString(), 10),
        subcategoryId: articleFormData.subcategoryId
          ? parseInt(articleFormData.subcategoryId.toString(), 10)
          : undefined,
        Initial: articleFormData.Initial,
        price8: articleFormData.price8,
        price12: articleFormData.price12,
        price16: articleFormData.price16,
        offerPrice: articleFormData.offerPrice,
      };

      let url = "/api/articles";
      let method = "POST";

      if (currentArticle) {
        url = `/api/articles/${currentArticle.id}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Error al guardar el artículo");
      
      // Si se creó un nuevo producto, notificar a InvoicePage
      if (!currentArticle) {
        onProductCreated();
      }

      setIsArticleModalOpen(false);
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      setError(error instanceof Error ? error.message : "Error saving article");
    }
  };

  // Mostrar indicador de carga mientras la sesión se está cargando
  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  // Mostrar mensaje si el usuario no está autenticado
  if (status === "unauthenticated") {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div>
      <Button
        text="Crear Artículo"
        icon={<Plus className="h-4 w-4" />}
        onClick={() => {
          setCurrentArticle(null);
          setIsArticleModalOpen(true);
        }}
        className="bg-blue-900 dark:bg-green-900 text-xs lg:text-sm text-gray-100 dark:hover:bg-green-700 dark:text-white py-2 px-4 inline-flex items-center"
      />

      {/* Modal para crear/editar artículo */}
      <Modal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {currentArticle ? "Actualizar Artículo" : "Añadir Artículo"}
        </h3>
        <form
          onSubmit={handleArticleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
              name="cost"
              type="number"
              value={articleFormData.cost}
              onChange={handleArticleInputChange}
              placeholder="Costo"
              required
              step="0.01"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              name="brand"
              value={articleFormData.brand || ""}
              onChange={handleArticleInputChange}
              placeholder="Marca"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              name="categoryId"
              value={articleFormData.categoryId}
              onChange={handleArticleInputChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Selección de Subcategoría - Opcional */}
            <select
              name="subcategoryId"
              value={articleFormData.subcategoryId || ""}
              onChange={handleArticleInputChange}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              disabled={isSubcategoriesLoading || subcategories.length === 0}
            >
              <option value="">Seleccione una subcategoría (opcional)</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
            {isSubcategoriesLoading && <p>Cargando subcategorías...</p>}
            {subcategories.length === 0 && articleFormData.categoryId !== 0 && !isSubcategoriesLoading && (
              <p className="text-gray-500">No hay subcategorías disponibles para esta categoría.</p>
            )}

            <select
              name="warehouseId"
              value={articleFormData.warehouseId}
              onChange={handleArticleInputChange}
              required
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Seleccione una bodega</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-4">
            <input
              name="camera"
              value={articleFormData.camera || ""}
              onChange={handleArticleInputChange}
              placeholder="Cámara"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              name="frontCamera"
              value={articleFormData.frontCamera || ""}
              onChange={handleArticleInputChange}
              placeholder="Cámara Frontal"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              name="ram"
              value={articleFormData.ram}
              onChange={handleArticleInputChange}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-4"
            >
              <option value="">Seleccione la memoria RAM</option>
              {ramOptions.map((ram, index) => (
                <option key={index} value={ram}>
                  {ram}
                </option>
              ))}
            </select>
            <select
              name="storage"
              value={articleFormData.storage}
              onChange={handleArticleInputChange}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-4"
            >
              <option value="">Seleccione el almacenamiento</option>
              {storageOptions.map((storage, index) => (
                <option key={index} value={storage}>
                  {storage}
                </option>
              ))}
            </select>
            <input
              name="processor"
              value={articleFormData.processor || ""}
              onChange={handleArticleInputChange}
              placeholder="Procesador"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              name="screenSize"
              value={articleFormData.screenSize || ""}
              onChange={handleArticleInputChange}
              placeholder="Tamaño de Pantalla"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              name="batteryCapacity"
              value={articleFormData.batteryCapacity || ""}
              onChange={handleArticleInputChange}
              placeholder="Capacidad de Batería"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="col-span-1 md:col-span-2 space-y-4">
            {["imageUrl1", "imageUrl2", "imageUrl3", "imageUrl4"].map(
              (field) => (
                <div key={field}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e, field as keyof Article)
                    }
                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  {articleFormData[field] && (
                    <CldImage
                      src={articleFormData[field]!}
                      alt="Imagen"
                      width={300}
                      height={300}
                    />
                  )}
                </div>
              )
            )}
            {uploadError && (
              <p className="text-red-500 dark:text-red-400">{uploadError}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="Initial"
                type="number"
                value={articleFormData.Initial || ""}
                onChange={handleArticleInputChange}
                placeholder="Inicial"
                step="0.01"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                name="price8"
                type="number"
                value={articleFormData.price8 || ""}
                onChange={handleArticleInputChange}
                placeholder="Precio 8 meses"
                step="0.01"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                name="price12"
                type="number"
                value={articleFormData.price12 || ""}
                onChange={handleArticleInputChange}
                placeholder="Precio 12 meses"
                step="0.01"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                name="price16"
                type="number"
                value={articleFormData.price16 || ""}
                onChange={handleArticleInputChange}
                placeholder="Precio 16 meses"
                step="0.01"
                className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <input
              name="financialEntity"
              value={articleFormData.financialEntity || ""}
              onChange={handleArticleInputChange}
              placeholder="Entidad Financiera"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              name="offerPrice"
              type="number"
              value={articleFormData.offerPrice || ""}
              onChange={handleArticleInputChange}
              placeholder="Precio de Oferta"
              step="0.01"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Mostrar errores generales */}
          {error && (
            <p className="text-red-500 dark:text-red-400">{error}</p>
          )}

          <div className="col-span-1 md:col-span-2 flex justify-center space-x-2">
            <Button
              type="button"
              text="Cancelar"
              onClick={() => setIsArticleModalOpen(false)}
              className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 inline-flex items-center"
            />
            <Button
              type="submit"
              text={currentArticle ? "Actualizar" : "Crear"}
              className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 inline-flex items-center"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
