// src/components/ClientTable.tsx
import React, { useEffect, useState } from 'react';
import { Client } from '@/models/client';
import { createClient, getClients, updateClient } from '@/services/clientService';
import Swal from 'sweetalert2';
import { useClientStore } from '@/stores/useClientStore';

const ClientTable = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setSelectedClient } = useClientStore();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los clientes.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleEditClient = async (clientId: number, updatedData: Partial<Client>) => {
    try {
      const updatedClient = await updateClient(clientId, updatedData);
      setClients((prev) =>
        prev.map((client) => (client.id === updatedClient.id ? updatedClient : client))
      );
      Swal.fire({
        icon: 'success',
        title: 'Cliente actualizado',
        text: 'La información del cliente ha sido actualizada.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el cliente.',
      });
    }
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    defaultValue={client.name ?? ''}
                    onBlur={(e) => handleEditClient(client.id, { name: e.target.value })}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    defaultValue={client.address ?? ''}
                    onBlur={(e) => handleEditClient(client.id, { address: e.target.value })}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    defaultValue={client.phone ?? ''}
                    onBlur={(e) => handleEditClient(client.id, { phone: e.target.value })}
                    className="w-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleSelectClient(client)}
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientTable;
