import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props} style={{ padding: '10px', margin: '5px', cursor: 'pointer' }}>{children}</button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div style={{ margin: '10px 0' }}>
    <label>{label}</label>
    <input {...props} style={{ display: 'block', width: '100%', padding: '5px' }} />
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: number; label: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => (
  <div style={{ margin: '10px 0' }}>
    <label>{label}</label>
    <select {...props} style={{ display: 'block', width: '100%', padding: '5px' }}>
      <option value="">Seleccione una opción</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    {error && <span style={{ color: 'red' }}>{error}</span>}
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        background: 'rgba(0,0,0,0.5)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        overflowY: 'auto',
        padding: '20px 0'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '5px', 
          maxWidth: '500px', 
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            X
          </button>
          <div style={{ marginTop: '30px' }}>
            {children}
          </div>
        </div>
      </div>
  );
};