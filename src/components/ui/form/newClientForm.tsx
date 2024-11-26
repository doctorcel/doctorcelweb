// src/components/ui/form/ClientForm.tsx
import React, { useState } from "react";
import { Client } from "@/models/client";
import { createClient } from "@/services/clientService";
import Swal from "sweetalert2";

interface ClientFormProps {
  onClose: () => void;
  onClientAdded: (client: Client) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ onClose, onClientAdded }) => {
  const [formData, setFormData] = useState<Client>({
    id: 0, // El id será generado en el backend
    name: "",
    email: null,
    phone: null,
    address: null,
    taxId: null,
    documentType: null,
    document: null,
    personType: null,
    regime: null,
    country: null,
    department: null,
    city: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Client>>({});

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación de los campos
  const validateForm = () => {
    const formErrors: Partial<Client> = {};
    if (!formData.name) formErrors.name = "El nombre es obligatorio";
    if (!formData.email)
      formErrors.email = "El correo electrónico es obligatorio";
    if (!formData.phone) formErrors.phone = "El teléfono es obligatorio";
    if (!formData.address) formErrors.address = "La dirección es obligatoria";
    if (!formData.documentType)
      formErrors.documentType = "El tipo de documento es obligatorio";
    if (!formData.document)
      formErrors.document = "El número de documento es obligatorio";
    if (!formData.personType)
      formErrors.personType = "El tipo de persona es obligatorio";
    if (!formData.regime) formErrors.regime = "El régimen es obligatorio";
    if (!formData.country) formErrors.country = "El país es obligatorio";
    if (!formData.department)
      formErrors.department = "El departamento es obligatorio";
    if (!formData.city) formErrors.city = "La ciudad es obligatoria";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const newClient = await createClient(formData); // Llamada al servicio para crear el cliente
      Swal.fire({
        title: "Cliente creado",
        text: `El cliente ${newClient.name} fue creado exitosamente.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      onClientAdded(newClient);
      onClose(); // Cierra el modal después de agregar el cliente
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear el cliente. Inténtelo nuevamente.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el nombre"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el correo electrónico"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el teléfono"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese la dirección"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>

        {/* Tipo de documento */}
        <div>
          <label
            htmlFor="documentType"
            className="block font-medium text-gray-700"
          >
            Tipo de Documento
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
          >
            <option value="">Seleccione</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="CE">Cédula de Extranjería</option>
            <option value="PAS">Pasaporte</option>
            <option value="PTP">PTP</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="NIT">NIT</option>
          </select>
          {errors.documentType && (
            <span className="text-red-500 text-sm">{errors.documentType}</span>
          )}
        </div>

        {/* Número de documento */}
        <div>
          <label htmlFor="document" className="block font-medium text-gray-700">
            Número de Documento
          </label>
          <input
            type="text"
            id="document"
            name="document"
            value={formData.document || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el número de documento"
          />
          {errors.document && (
            <span className="text-red-500 text-sm">{errors.document}</span>
          )}
        </div>

        {/* Tipo de persona */}
        <div>
          <label
            htmlFor="personType"
            className="block font-medium text-gray-700"
          >
            Tipo de Persona
          </label>
          <select
            id="personType"
            name="personType"
            value={formData.personType || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
          >
            <option value="">Seleccione</option>
            <option value="Natural">Persona Natural</option>
            <option value="Juridica">Persona Jurídica</option>
          </select>
          {errors.personType && (
            <span className="text-red-500 text-sm">{errors.personType}</span>
          )}
        </div>

        {/* Régimen */}
        <div>
          <label htmlFor="regime" className="block font-medium text-gray-700">
            Régimen
          </label>
          <select
            id="regime"
            name="regime"
            value={formData.regime || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
          >
            <option value="">Seleccione</option>
            <option value="Simplificado">Simplificado</option>
            <option value="Común">Común</option>
          </select>
          {errors.regime && (
            <span className="text-red-500 text-sm">{errors.regime}</span>
          )}
        </div>

        {/* País */}
        <div>
          <label htmlFor="country" className="block font-medium text-gray-700">
            País
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el país"
          />
          {errors.country && (
            <span className="text-red-500 text-sm">{errors.country}</span>
          )}
        </div>

        {/* Departamento */}
        <div>
          <label
            htmlFor="department"
            className="block font-medium text-gray-700"
          >
            Departamento
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese el departamento"
          />
          {errors.department && (
            <span className="text-red-500 text-sm">{errors.department}</span>
          )}
        </div>

        {/* Ciudad */}
        <div>
          <label htmlFor="city" className="block font-medium text-gray-700">
            Ciudad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="mt-2 p-2 border w-full rounded-md"
            placeholder="Ingrese la ciudad"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city}</span>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300"
        >
          {loading ? "Cargando..." : "Guardar Cliente"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
