// components/ui/CreateClient.tsx

'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import ClientForm from "@/components/ui/form/newClientForm";
import { Plus } from "lucide-react";
import { Client } from '@prisma/client';

interface CreateClientProps {
  onClientCreated: (client: Client) => void; // Actualizado para recibir el nuevo cliente
}

export default function CreateClient({ onClientCreated }: CreateClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleClientAdded = (client: Client) => {
    // Aquí podrías realizar acciones adicionales si es necesario
    onClientCreated(client); // Notificar a TechServiceForm con el nuevo cliente
    setIsModalOpen(false); // Cerrar el modal
  };

  const handleOpenModal = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <>
      <Button
        text="Crear Cliente"
        icon={<Plus className="h-4 w-4" />}
        onClick={handleOpenModal}
        className="bg-blue-900 dark:bg-green-900 text-xs lg:text-sm text-gray-100 dark:hover:bg-green-700 dark:text-white py-2 px-4 inline-flex items-center" 
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4">
          Formulario de Nuevo Cliente
        </h2>
        <ClientForm
          onClose={handleCloseModal}
          onClientAdded={handleClientAdded}
        />
      </Modal>
    </>
  )
}
