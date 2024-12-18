// src/components/ClientList.tsx

import React from 'react';
import { Client } from '@/models/client';
import { getClients, updateClient } from '@/services/clientService';
import { useEffect, useState } from 'react';
import UpdateClientForm from './UpdateClientForm';

interface ClientListProps {
  onClientUpdated: () => void;
}

const ClientList: React.FC<ClientListProps> = ({ onClientUpdated }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        // Filtrar clientes con estado ENABLED
        const activeClients = data.filter(client => client.active === 'ENABLED');
        setClients(activeClients);
      } catch (err: any) {
        setError(err.message || 'Error al obtener los clientes');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [onClientUpdated]);

  const handleDelete = async (client: Client) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar al cliente ${client.name}?`)) return;

    try {
      await updateClient(client.id, { active: 'DISABLED' });
      setClients(prev => prev.filter(c => c.id !== client.id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el cliente');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4">ID</th>
            <th className="py-3 px-4">Nombre</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Teléfono</th>
            <th className="py-3 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="text-center border-b">
              <td className="py-2 px-4">{client.id}</td>
              <td className="py-2 px-4">{client.name}</td>
              <td className="py-2 px-4">{client.email}</td>
              <td className="py-2 px-4">{client.phone}</td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => setEditingClient(client)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(client)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar cliente */}
      {editingClient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <UpdateClientForm
              client={editingClient}
              onClose={() => setEditingClient(null)}
              onClientUpdated={() => {
                setEditingClient(null);
                onClientUpdated();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;
