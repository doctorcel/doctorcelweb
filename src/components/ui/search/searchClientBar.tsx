// src/components/ui/SearchClientBar.tsx
import React, { useState, useEffect } from 'react';
import { Client } from '@/models/client';
import { getClients } from '@/services/clientService';
import { useClientStore } from '@/stores/useClientStore';

const SearchClientBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
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
  };

  // Maneja la selección de un cliente
  const handleClientSelect = (clientId: number) => {
    setSelectedClientId(clientId);
    setSearchQuery('');  // Limpiar la barra de búsqueda después de seleccionar
    setFilteredClients([]);  // Limpiar los resultados de búsqueda
  };

  return (
    <div className="relative mt-5">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar cliente por nombre, cédula o teléfono..."
        className="p-2 border rounded-md w-full"
      />
      {filteredClients.length > 0 && (
        <ul className="absolute mt-2 w-full bg-white border rounded-md shadow-md max-h-60 dark:bg-gray-900 overflow-y-auto">
          {filteredClients.map(client => (
            <li
              key={client.id}
              onClick={() => handleClientSelect(client.id)}
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
