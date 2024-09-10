'use client';

import React from 'react';

interface QuickFilterProps {
  onFilterChange: (filter: string) => void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={() => onFilterChange('all')} className="px-4 py-2 bg-blue-500 text-white rounded">
        Todos
      </button>
      <button onClick={() => onFilterChange('featured')} className="px-4 py-2 bg-green-500 text-white rounded">
        Destacados
      </button>
      <button onClick={() => onFilterChange('new')} className="px-4 py-2 bg-yellow-500 text-white rounded">
        Nuevos
      </button>
    </div>
  );
};

export default QuickFilter;