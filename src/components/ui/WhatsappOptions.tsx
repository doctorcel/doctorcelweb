import React from 'react';

interface WhatsAppOptionsProps {
  onClick: (number: string) => void;
}

const WhatsAppOptions: React.FC<WhatsAppOptionsProps> = ({ onClick }) => (
  <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-auto">
    <button
      onClick={() => onClick('+573004001077')}
      className="w-full text-gray-800 dark:text-white dark:bg-gray-700 text-left px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200"
    >
      Sede Itagui
    </button>
    <button
      onClick={() => onClick('+573504089988')}
      className="w-full text-left text-gray-800 dark:text-white dark:bg-gray-700 px-4 py-2 hover:bg-gray-100 hover:dark:bg-gray-900 transition-colors duration-200"
    >
      Sede San Antonio de Prado
    </button>
  </div>
);

export default WhatsAppOptions;
