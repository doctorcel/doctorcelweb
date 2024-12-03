import ClientManagement from '@/components/clientManagement'
import CreateClient from '@/components/ui/createClient';
import React from 'react'

export default function InvoicePage() {
  return (
    <>
    <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-900 dark:text-gray-300 p-8">
      <div className="ml-12 mr-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Facturación
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          En esta sección, puedes crear la factuación de ventas, verifica que
          ingreses toda la información correctamente.
        </p>
      </div>
      <CreateClient />
    </div><ClientManagement />
    </>
  )
}
