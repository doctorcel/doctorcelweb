// src/pages/clients/index.tsx
'use client'

import React, { useState } from 'react';
import ClientList from '@/components/dashboard/client/ClientList';
import CreateClientForm from '@/components/dashboard/client/CreateClientForm';

const ClientsPage: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleClientCreated = () => {
    setRefresh(prev => !prev);
  };

  const handleClientUpdated = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Gestión de Clientes</h1>
        
        <div className="mb-8">
          <CreateClientForm onClientCreated={handleClientCreated} />
        </div>

        <ClientList onClientUpdated={handleClientUpdated} />
      </div>
    </div>
  );
};

export default ClientsPage;
