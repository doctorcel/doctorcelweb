// src/components/CreateClientForm.tsx

import React, { useState } from 'react';
import { createClient } from '@/services/clientService';
import { Client } from '@/models/client';
import Swal from 'sweetalert2';

interface CreateClientFormProps {
  onClientCreated: () => void;
}

const CreateClientForm: React.FC<CreateClientFormProps> = ({ onClientCreated }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    documentType: string;
    personType: string;
    regime: string;
    country: string;
    department: string;
    city: string;
    document: string;
    taxId: string; // Añadido taxId
  }>({
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
    taxId: '', // Inicializado como cadena vacía
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Client | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    const { name, email, phone, address, documentType, personType, regime, country, department, city, document, taxId } = formData;
    if (!name.trim()) {
      setError('El campo Nombre es obligatorio.');
      return false;
    }
    if (!email.trim()) {
      setError('El campo Email es obligatorio.');
      return false;
    }
    if (!phone.trim()) {
      setError('El campo Teléfono es obligatorio.');
      return false;
    }
    if (!address.trim()) {
      setError('El campo Dirección es obligatorio.');
      return false;
    }
    if (!documentType) {
      setError('El campo Tipo de Documento es obligatorio.');
      return false;
    }
    if (!document.trim()) {
      setError('El campo Número de Documento es obligatorio.');
      return false;
    }
    if (!personType) {
      setError('El campo Tipo de Persona es obligatorio.');
      return false;
    }
    if (!regime) {
      setError('El campo Régimen es obligatorio.');
      return false;
    }
    if (!country.trim()) {
      setError('El campo País es obligatorio.');
      return false;
    }
    if (!department.trim()) {
      setError('El campo Departamento es obligatorio.');
      return false;
    }
    if (!city.trim()) {
      setError('El campo Ciudad es obligatorio.');
      return false;
    }
    if (!taxId.trim()) {
      setError('El campo ID Fiscal es obligatorio.');
      return false;
    }
    // Validación adicional para email si es necesario
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('El formato del Email no es válido.');
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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
        taxId: '', // Reiniciado taxId
      });
      Swal.fire({
        title: 'Cliente Creado',
        text: `El cliente ${newClient.name} fue creado exitosamente.`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
      onClientCreated();
    } catch (err: any) {
      setError(err.message || 'Error al crear el cliente');
      Swal.fire({
        title: 'Error',
        text: err.message || 'Hubo un problema al crear el cliente.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Crear Nuevo Cliente</h2>
      {error && <div className="text-red-500 mb-2">Error: {error}</div>}
      {success && <div className="text-green-500 mb-2">Cliente creado: {success.name}</div>}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
        <div>
          <label className="block text-gray-700">Dirección *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tipo de Documento *</label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="">Seleccione</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PAS">Pasaporte</option>
            <option value="PTP">PTP</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="NIT">NIT</option>
          </select>
        </div>
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
          <label className="block text-gray-700">Tipo de Persona *</label>
          <select
            name="personType"
            value={formData.personType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="">Seleccione</option>
            <option value="Natural">Persona Natural</option>
            <option value="Juridica">Persona Jurídica</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Régimen *</label>
          <select
            name="regime"
            value={formData.regime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          >
            <option value="">Seleccione</option>
            <option value="Simplificado">Simplificado</option>
            <option value="Común">Común</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">País *</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Departamento *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">Ciudad *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block text-gray-700">ID Fiscal *</label> {/* Campo taxId */}
          <input
            type="text"
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creando...' : 'Crear Cliente'}
        </button>
      </form>
    </div>
  );
};

export default CreateClientForm;
