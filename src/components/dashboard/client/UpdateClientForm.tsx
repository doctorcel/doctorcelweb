// src/components/UpdateClientForm.tsx

import React, { useState } from 'react';
import { Client } from '@/models/client';
import { updateClient } from '@/services/clientService';

interface UpdateClientFormProps {
  client: Client;
  onClose: () => void;
  onClientUpdated: () => void;
}

const UpdateClientForm: React.FC<UpdateClientFormProps> = ({ client, onClose, onClientUpdated }) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email || '',
    phone: client.phone || '',
    address: client.address || '',
    taxId: client.taxId || '',
    documentType: client.documentType || '',
    personType: client.personType || '',
    regime: client.regime || '',
    country: client.country || '',
    department: client.department || '',
    city: client.city || '',
    document: client.document || '',
    active: client.active,
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
      const updated = await updateClient(client.id, formData);
      setSuccess(updated);
      onClientUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Actualizar Cliente</h2>
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      {success && <div className="text-green-500 mb-2">Cliente actualizado: {success.name}</div>}
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
        <div>
          <label className="block text-gray-700">Estado</label>
          <select
            name="active"
            value={formData.active}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="ENABLED">Habilitado</option>
            <option value="DISABLED">Deshabilitado</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {loading ? 'Actualizando...' : 'Actualizar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClientForm;
