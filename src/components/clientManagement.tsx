'use client'

import React, { useState } from 'react';
import Button from '@/components/ui/button/button';
import Modal from '@/components/ui/modal/modal';
import ClientForm from '@/components/ui/form/newClientForm';
import { Client } from '@/models/client';

const ClientManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);

  const handleClientAdded = (client: Client) => {
    setClients((prev) => [...prev, client]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);  // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Cerrar el modal
  };

  return (
    <div className="p-6">
      <Button
        text="Agregar Nuevo Cliente"
        onClick={handleOpenModal}
        className="bg-green-500 hover:bg-green-600"
      />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4">Formulario de Nuevo Cliente</h2>
        <ClientForm onClose={handleCloseModal} onClientAdded={handleClientAdded} />
      </Modal>
    </div>
  );
};

export default ClientManagement;
