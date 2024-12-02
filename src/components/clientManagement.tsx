"use client";

import React, { useState } from "react";
import Button from "@/components/ui/button/button";
import Modal from "@/components/ui/modal/modal";
import ClientForm from "@/components/ui/form/newClientForm";
import { Client } from "@/models/client";
import CreateProduct from "./ui/createProduct";
import { Plus } from "lucide-react";
import InvoiceForm from "./ui/invoice/invoiceform";



const ClientManagement: React.FC = () => {
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
    <div className="p-0">
      <div className="flex gap-5 items-center w-full">
        <Button
          text="Crear Cliente"
          icon={<Plus className="h-4 w-4" />}
          onClick={handleOpenModal}
          className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 inline-flex items-center"
        />
        <CreateProduct />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4">
          Formulario de Nuevo Cliente
        </h2>
        <ClientForm
          onClose={handleCloseModal}
          onClientAdded={handleClientAdded}
        />
      </Modal>

      <InvoiceForm />

      {/* <CategoryManagement /> */}
    </div>
  );
};

export default ClientManagement;
