'use client';
import CategoryList from "@/components/dashboard/categories/categoryList";
import SubcategoryList from "@/components/dashboard/categories/subcategoryList";
import CreateProduct from "@/components/ui/createProduct";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

export default function ProductsPageManag() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState("products");

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Gestión de Productos
        </h1>
        <div className="flex gap-4">
          <CreateProduct 
            onProductCreated={triggerRefresh} 
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md bg-gray-100 dark:bg-gray-800">
          <TabsTrigger 
            value="products"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Productos
          </TabsTrigger>
          <TabsTrigger 
            value="categories"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Categorías
          </TabsTrigger>
          <TabsTrigger 
            value="subcategories"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Subcategorías
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4">
          <Card className="p-6 bg-white dark:bg-gray-800">
            {/* Aquí iría el listado de productos si lo implementas */}
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Selecciona una categoría o subcategoría para filtrar productos
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-4">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <CategoryList />
          </Card>
        </TabsContent>

        <TabsContent value="subcategories" className="mt-4">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <SubcategoryList />
          </Card>
        </TabsContent>
      </Tabs>

      {/* Layout alternativo para pantallas grandes */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Categorías</h2>
            <CategoryList />
          </Card>
          
          <Card className="p-6 bg-white dark:bg-gray-800">
            <h2 className="text-xl font-semibold mb-4">Subcategorías</h2>
            <SubcategoryList />
          </Card>
        </div>
      </div>
    </div>
  );
}