import React from 'react';

interface ButtonProps {
  text: string;  // Texto del botón
  icon?: React.ReactNode;  // Ícono opcional
  onClick?: () => void;  // Función a ejecutar al hacer click
  className?: string;  // Clases adicionales para personalizar el estilo
  type?: 'button' | 'submit' | 'reset';  // Tipo del botón (por defecto 'button')
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`}
    >
      {/* Mostrar el ícono si se proporciona */}
      {icon && <span className="mr-2">{icon}</span>}
      
      {/* Mostrar el texto del botón */}
      {text}
    </button>
  );
};

export default Button;
