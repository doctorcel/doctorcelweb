import React, { useState } from 'react';
import styled from 'styled-components';

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  documentType: string;
  document: string;
  personType: string;
  regime: string;
  country: string;
  department: string;
  city: string;
}

interface ClientFormProps {
  onClientCreated: (client: ClientFormData & { id: number }) => void;
  onCancel: () => void;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

// ... otros styled components

const ClientForm: React.FC<ClientFormProps> = ({ onClientCreated, onCancel }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    documentType: '',
    document: '',
    personType: '',
    regime: '',
    country: '',
    department: '',
    city: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create client');
      }

      const newClient = await response.json();
      onClientCreated(newClient);
    } catch (error) {
      console.error('Error creating client:', error);
      alert('Error creating client');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Celular"
      />
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Direccion"
      />
      <input
        type="text"
        name="taxId"
        value={formData.taxId}
        onChange={handleChange}
        placeholder="Identificacion tributaria"
      />
      <Select
        name="documentType"
        value={formData.documentType}
        onChange={handleChange}
      >
        <option value="">Seleccione Tipo de Documento</option>
        <option value="CC">Cédula de Ciudadanía</option>
        <option value="CE">Cédula de Extranjería</option>
        <option value="PP">Pasaporte</option>
        <option value="PTP">Permiso Temporal de Permanencia </option>
        <option value="NIT">NIT</option>
      </Select>
      <input
        type="text"
        name="document"
        value={formData.document}
        onChange={handleChange}
        placeholder="Documento"
      />
      <Select
        name="personType"
        value={formData.personType}
        onChange={handleChange}
      >
        <option value="">Selecciona tipo de persona</option>
        <option value="Natural">Persona Natural</option>
        <option value="Juridica">Persona Jurídica</option>
      </Select>
      <Select
        name="regime"
        value={formData.regime}
        onChange={handleChange}
      >
        <option value="">Selecciona Régimen</option>
        <option value="Simplificado">Régimen Simplificado</option>
        <option value="Comun">Régimen Común</option>
      </Select>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Pais de Origen"
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Departamento"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Ciudad"
      />
      <button type="submit">Crear Cliente</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </Form>
  );
};

export default ClientForm;