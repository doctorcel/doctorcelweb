// components/InvoicePage.tsx

"use client";

import React, { useState } from 'react';
import CreateClient from '@/components/ui/createClient';
import CreateProduct from '@/components/ui/createProduct';
import InvoiceForm from '@/components/ui/invoiceform'; // Asegúrate de importar correctamente
import { useSession } from 'next-auth/react';

const InvoicePage = () => {
  // Estado para disparar la actualización de InvoiceForm
  const [refreshKey, setRefreshKey] = useState(0);
  const { data: session, status } = useSession();

  // Función para incrementar refreshKey y disparar la actualización
  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Mostrar mensaje de carga o autenticación
  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="flex justify-center items-center h-screen">No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-900 dark:text-gray-300 p-8 w-full">
        <div className="ml-12 mr-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Facturación</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            En esta sección, puedes crear la facturación de ventas, verifica que ingreses toda la información correctamente.
          </p>
        </div>
        <div className='flex gap-3 flex-wrap'>
          {/* Pasamos triggerRefresh a CreateClient y CreateProduct */}
          <CreateClient onClientCreated={triggerRefresh} />
          <CreateProduct onProductCreated={triggerRefresh} />
        </div>
      </div>
      {/* Pasamos refreshKey a InvoiceForm */}
      <InvoiceForm refreshKey={refreshKey} />
    </div>
  );
};

export default InvoicePage;
