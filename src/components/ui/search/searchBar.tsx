import React, { useState } from 'react';
import { useQuery } from 'react-query'; // Asumimos que usas React Query o algo similar para obtener datos

interface SearchProps {
  searchTerm: string;
  endpoint: string; // "/api/client" o "/api/articles"
  onSelect: (item: any) => void; // callback para seleccionar un cliente o artículo
}

const SearchBar: React.FC<SearchProps> = ({ searchTerm, endpoint, onSelect }) => {
  const { data, isLoading, error } = useQuery(
    [endpoint, searchTerm],
    async () => {
      const response = await fetch(`${endpoint}?search=${searchTerm}`);
      const data = await response.json();
      return data;
    },
    {
      enabled: searchTerm.length > 2, // Solo hacer la búsqueda cuando el término tenga al menos 3 caracteres
    }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading results</p>;

  return (
    <div>
      {data?.map((item: any) => (
        <div key={item.id} className="cursor-pointer" onClick={() => onSelect(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
