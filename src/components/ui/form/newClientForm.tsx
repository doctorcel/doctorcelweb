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
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    taxId: "",
    documentType: "",
    document: "",
    personType: "",
    regime: "",
    country: "",
    department: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({});

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validación de los campos
  const validateForm = (): boolean => {
    const formErrors: Partial<Record<keyof Client, string>> = {};

    if (!formData.name?.trim()) formErrors.name = "El nombre es obligatorio";
    if (!formData.email?.trim()) {
      formErrors.email = "El correo electrónico es obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      formErrors.email = "El correo electrónico no es válido";
    }
    if (!formData.phone?.trim()) formErrors.phone = "El teléfono es obligatorio";
    if (!formData.address?.trim()) formErrors.address = "La dirección es obligatoria";
    if (!formData.documentType) formErrors.documentType = "El tipo de documento es obligatorio";
    if (!formData.document?.trim()) formErrors.document = "El número de documento es obligatorio";
    if (!formData.personType) formErrors.personType = "El tipo de persona es obligatorio";
    if (!formData.regime) formErrors.regime = "El régimen es obligatorio";
    if (!formData.country?.trim()) formErrors.country = "El país es obligatorio";
    if (!formData.department?.trim()) formErrors.department = "El departamento es obligatorio";
    if (!formData.city?.trim()) formErrors.city = "La ciudad es obligatoria";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const newClient = await createClient(formData as any); // Utiliza 'any' o ajusta las interfaces si es necesario
      Swal.fire({
        title: "Cliente creado",
        text: `El cliente ${newClient.name} fue creado exitosamente.`,
        icon: "success",
        confirmButtonText: "OK",
      });

      onClientAdded(newClient);
      onClose(); // Cierra el modal después de agregar el cliente

      // Reiniciar el formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        documentType: "",
        document: "",
        personType: "",
        regime: "",
        country: "",
        department: "",
        city: "",
      });
    } catch (error: any) {
      const errorMessage = error.message || "Hubo un problema al crear el cliente. Inténtelo nuevamente.";
      setErrors({ document: errorMessage }); // Puedes mapear el error a un campo específico si lo deseas
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nombre */}
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
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el nombre"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
            required
          />
          {errors.name && (
            <span id="name-error" className="text-red-500 text-sm">
              {errors.name}
            </span>
          )}
        </div>

        {/* Correo Electrónico */}
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el correo electrónico"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            required
          />
          {errors.email && (
            <span id="email-error" className="text-red-500 text-sm">
              {errors.email}
            </span>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el teléfono"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
            required
          />
          {errors.phone && (
            <span id="phone-error" className="text-red-500 text-sm">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.address ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese la dirección"
            aria-invalid={!!errors.address}
            aria-describedby="address-error"
            required
          />
          {errors.address && (
            <span id="address-error" className="text-red-500 text-sm">
              {errors.address}
            </span>
          )}
        </div>

        {/* Tipo de Documento */}
        <div>
          <label htmlFor="documentType" className="block font-medium text-gray-700">
            Tipo de Documento
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.documentType ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.documentType}
            aria-describedby="documentType-error"
            required
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
            <span id="documentType-error" className="text-red-500 text-sm">
              {errors.documentType}
            </span>
          )}
        </div>

        {/* Número de Documento */}
        <div>
          <label htmlFor="document" className="block font-medium text-gray-700">
            Número de Documento
          </label>
          <input
            type="text"
            id="document"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.document ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el número de documento"
            aria-invalid={!!errors.document}
            aria-describedby="document-error"
            required
          />
          {errors.document && (
            <span id="document-error" className="text-red-500 text-sm">
              {errors.document}
            </span>
          )}
        </div>

        {/* Tipo de Persona */}
        <div>
          <label htmlFor="personType" className="block font-medium text-gray-700">
            Tipo de Persona
          </label>
          <select
            id="personType"
            name="personType"
            value={formData.personType}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.personType ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.personType}
            aria-describedby="personType-error"
            required
          >
            <option value="">Seleccione</option>
            <option value="Natural">Persona Natural</option>
            <option value="Juridica">Persona Jurídica</option>
          </select>
          {errors.personType && (
            <span id="personType-error" className="text-red-500 text-sm">
              {errors.personType}
            </span>
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
            value={formData.regime}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.regime ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={!!errors.regime}
            aria-describedby="regime-error"
            required
          >
            <option value="">Seleccione</option>
            <option value="Simplificado">Simplificado</option>
            <option value="Común">Común</option>
          </select>
          {errors.regime && (
            <span id="regime-error" className="text-red-500 text-sm">
              {errors.regime}
            </span>
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
            value={formData.country}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el país"
            aria-invalid={!!errors.country}
            aria-describedby="country-error"
            required
          />
          {errors.country && (
            <span id="country-error" className="text-red-500 text-sm">
              {errors.country}
            </span>
          )}
        </div>

        {/* Departamento */}
        <div>
          <label htmlFor="department" className="block font-medium text-gray-700">
            Departamento
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.department ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese el departamento"
            aria-invalid={!!errors.department}
            aria-describedby="department-error"
            required
          />
          {errors.department && (
            <span id="department-error" className="text-red-500 text-sm">
              {errors.department}
            </span>
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
            value={formData.city}
            onChange={handleChange}
            className={`mt-2 p-2 border w-full rounded-md ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ingrese la ciudad"
            aria-invalid={!!errors.city}
            aria-describedby="city-error"
            required
          />
          {errors.city && (
            <span id="city-error" className="text-red-500 text-sm">
              {errors.city}
            </span>
          )}
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Cargando..." : "Guardar Cliente"}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
