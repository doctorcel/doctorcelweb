// src/components/CreateClientForm.tsx

import React, { useState } from 'react';
import { createClient } from '@/services/clientService';
import { Client } from '@/models/client';

interface CreateClientFormProps {
  onClientCreated: () => void;
}

const CreateClientForm: React.FC<CreateClientFormProps> = ({ onClientCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    documentType: '',
    personType: '',
    regime: '',
    country: '',
    department: '',
    city: '',
    document: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Client | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const newClient = await createClient(formData);
      setSuccess(newClient);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        documentType: '',
        personType: '',
        regime: '',
        country: '',
        department: '',
        city: '',
        document: '',
      });
      onClientCreated();
    } catch (err: any) {
      setError(err.message || 'Error al crear el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Crear Nuevo Cliente</h2>
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      {success && <div className="text-green-500 mb-2">Cliente creado: {success.name}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        {/* Añade otros campos según sea necesario */}
        <div>
          <label className="block text-gray-700">Número de Documento *</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {loading ? 'Creando...' : 'Crear Cliente'}
        </button>
      </form>
    </div>
  );
};

export default CreateClientForm;
