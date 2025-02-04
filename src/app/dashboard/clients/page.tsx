'use client'

import React, { useState } from 'react';
import ClientList from '@/components/dashboard/client/ClientList';
import CreateClientForm from '@/components/dashboard/client/CreateClientForm';
import { Button } from '@/components/ui/button/button';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Modal from '@/components/modal/modal';

const ClientsPage: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Gestión de Clientes
        </h1>
        <Button
          text="Nuevo Cliente"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        />
      </div>

      <Card className="p-6 bg-white dark:bg-gray-800">
        <ClientList key={refreshKey} onClientUpdated={handleRefresh} />
      </Card>

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        className="max-w-3xl"
      >
        <Card>
          <div className="p-6">
            <CreateClientForm 
              onClientCreated={handleRefresh} onClose={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default ClientsPage;