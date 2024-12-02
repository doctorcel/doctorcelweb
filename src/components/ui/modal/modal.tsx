import React from 'react';

interface ModalProps {
  isOpen: boolean;  // Propiedad para manejar la visibilidad del modal
  onClose: () => void;  // Función para cerrar el modal
  children: React.ReactNode;  // Contenido del modal, que será pasado como children
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  // Si el modal no está abierto, no renderiza nada

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="dark:bg-gray-900 p-6 rounded-lg w-full max-w-5xl bg-slate-200 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times; {/* Icono de cerrar */}
        </button>
        <div className="max-h-[80vh] overflow-y-auto">{children}</div>  {/* Desplazamiento vertical si el contenido es largo */}
      </div>
    </div>
  );
};

export default Modal;
