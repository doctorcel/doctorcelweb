import React, { useState, useEffect } from 'react';
import { Client } from '@/models/client';
import { getClients } from '@/services/clientService';
import { useClientStore } from '@/stores/useClientStore';

const SearchClientBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const setSelectedClientId = useClientStore((state) => state.setSelectedClientId);

  // Función para filtrar los clientes en base a la búsqueda
  const filterClients = (query: string) => {
    if (!query) {
      setFilteredClients([]);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(lowercasedQuery) ||
      client.document?.toLowerCase().includes(lowercasedQuery) ||
      client.phone?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredClients(filtered);
  };

  // Efecto para cargar los clientes al montar el componente
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error('Error al obtener los clientes', error);
      }
    };
    fetchClients();
  }, []);

  // Efecto para aplicar el filtro de búsqueda
  useEffect(() => {
    filterClients(searchQuery);
  }, [searchQuery, clients]);

  // Maneja el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedClient(null); // Resetea el cliente seleccionado al cambiar la búsqueda
  };

  // Maneja la selección de un cliente
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setSelectedClientId(client.id); // Guarda el ID en el store
    setSearchQuery(client.name); // Muestra el nombre del cliente seleccionado en la barra
    setFilteredClients([]); // Limpia los resultados de búsqueda
  };

  // Maneja la limpieza de la selección del cliente
  const clearSelection = () => {
    setSelectedClient(null);
    setSearchQuery('');
    setSelectedClientId(null); // Limpia el ID en el store
  };

  return (
    <div className="relative mt-5">
      <div className="flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar cliente por nombre, cédula o teléfono..."
          className="p-2 border rounded-md w-full"
          disabled={!!selectedClient} // Desactiva la barra si hay un cliente seleccionado
        />
        {selectedClient && (
          <button
            onClick={clearSelection}
            className="ml-2 p-2 bg-red-500 text-white rounded-md"
          >
            X
          </button>
        )}
      </div>
      {filteredClients.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-md max-h-60 dark:bg-gray-900 overflow-y-auto">
          {filteredClients.map(client => (
            <li
              key={client.id}
              onClick={() => handleClientSelect(client)}
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {client.name} - {client.document} - {client.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchClientBar;
