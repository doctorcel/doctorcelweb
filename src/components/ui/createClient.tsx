'use client'
import React, { useState } from 'react'
import {Button} from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import ClientForm from "@/components/ui/form/newClientForm";
import { Plus } from "lucide-react";
import { Client } from '@prisma/client';

export default function CreateClient() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);
  
  
    const handleClientAdded = (client: Client) => {
      setClients((prev) => [...prev, client]);
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
          className="bg-blue-900 dark:bg-green-900 text-gray-100 dark:hover:bg-green-700 dark:text-white py-2 px-4 inline-flex items-center" /><Modal isOpen={isModalOpen} onClose={handleCloseModal}>
              <h2 className="text-xl font-semibold mb-4">
                  Formulario de Nuevo Cliente
              </h2>
              <ClientForm
                  onClose={handleCloseModal}
                  onClientAdded={handleClientAdded} />
          </Modal>
          </>
  )
}
