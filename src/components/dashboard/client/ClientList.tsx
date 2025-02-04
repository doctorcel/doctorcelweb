import React, { useEffect, useState, useMemo } from 'react';
import { Client } from '@/models/client';
import { getClients, updateClient } from '@/services/clientService';
import UpdateClientForm from './UpdateClientForm';
import { Button } from '@/components/ui/button/button';
import { Loader2, Edit, Trash2, Search } from 'lucide-react';
import Modal from '@/components/modal/modal';
import { Card } from '@/components/ui/card';
import { debounce } from 'lodash';

interface ClientListProps {
  onClientUpdated: () => void;
}

const ClientList: React.FC<ClientListProps> = ({ onClientUpdated }) => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Obtener y ordenar clientes
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        const activeClients = data
          .filter(client => client.active === 'ENABLED')
          .sort((a, b) => b.id - a.id); // Orden descendente por ID
        setAllClients(activeClients);
      } catch (err: any) {
        setError(err.message || 'Error al obtener los clientes');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [onClientUpdated]);

  // Filtrar y paginar clientes
  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return allClients.filter(client =>
      Object.values(client).some(value =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [allClients, searchTerm]);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClients, currentPage]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, 300);

  const handleDelete = async (client: Client) => {
    if (!confirm(`¿Eliminar a ${client.name}?`)) return;
    
    try {
      await updateClient(client.id, { active: 'DISABLED' });
      setAllClients(prev => prev.filter(c => c.id !== client.id));
    } catch (err: any) {
      alert(err.message || 'Error al eliminar');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar clientes..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full p-2 pl-10 border rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <div className="p-4 text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
          {error}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedClients.map(client => (
              <Card key={client.id} className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      #{client.id} - {client.name}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>{client.email}</p>
                      <p>{client.phone}</p>
                      <p>{client.documentType}: {client.document}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => setEditingClient(client)}
                      className="p-2 text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-600"
                    />
                    <Button
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDelete(client)}
                      className="p-2 text-red-600 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
                    />
                  </div>
                </div>
              </Card>
            ))}

            {paginatedClients.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No se encontraron clientes
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg">
            <Button
              text="Anterior"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              text="Siguiente"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            />
          </div>
        </>
      )}

      {editingClient && (
        <Modal
          isOpen={!!editingClient}
          onClose={() => setEditingClient(null)}
          className="max-w-3xl"
        >
          <Card>
            <div className="p-6">
              <UpdateClientForm
                client={editingClient}
                onClose={() => setEditingClient(null)}
                onClientUpdated={() => {
                  onClientUpdated();
                  setCurrentPage(1);
                }}
              />
            </div>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default ClientList;