// src/components/CreateClientForm.tsx
import React, { useState } from 'react';
import { createClient } from '@/services/clientService';
import { Client } from '@/models/client';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button/button';
import { Loader2 } from 'lucide-react';

interface CreateClientFormProps {
  onClientCreated: () => void;
  onClose: () => void;
}

const CreateClientForm: React.FC<CreateClientFormProps> = ({ onClientCreated, onClose }) => {
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
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nuevo Cliente</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de información básica */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Teléfono *
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Sección de documentos */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Tipo de Documento *
            </label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {/* ... opciones */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Número de Documento *
            </label>
            <input
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Tipo de Persona *
            </label>
            <select
              name="personType"
              value={formData.personType}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {/* ... opciones */}
            </select>
          </div>
        </div>

        {/* Sección de ubicación */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              País *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Departamento *
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Ciudad *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="col-span-full flex justify-end gap-4 mt-6">
          <Button
            type="button"
            text="Cancelar"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white"
          />
          <Button
            type="submit"
            text={loading ? "Creando..." : "Crear Cliente"}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
            icon={loading ? <Loader2 className="animate-spin w-4 h-4" /> : undefined}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateClientForm;