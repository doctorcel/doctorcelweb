'use client'
import React, { useEffect, useState } from "react";
import { getTechServiceDetails, updateTechServiceStatus } from "@/services/techservice"; // Asegúrate de importar el servicio
import { Button } from "@/components/ui/Button";
import SweetAlert from "sweetalert2";
import { TechServiceDetails } from "@/models/techservice";

interface TechServiceModalProps {
  techService: TechServiceDetails;
  onClose: () => void;
}

const TechServiceModal: React.FC<TechServiceModalProps> = ({ techService, onClose }) => {
  const [serviceDetails, setServiceDetails] = useState<TechServiceDetails | null>(null);
  const [status, setStatus] = useState<string>(techService.status);

  // Cargar los detalles del techService al abrir el modal
  useEffect(() => {
    const fetchTechServiceDetails = async () => {
      try {
        const data = await getTechServiceDetails(techService.id);
        setServiceDetails(data); // Asumiendo que el API devuelve los datos completos
      } catch (error) {
        console.error("Error al obtener los detalles del TechService:", error);
      }
    };

    fetchTechServiceDetails();
  }, [techService.id]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  // Función para manejar el cambio de estado y mostrar la alerta de confirmación
  const handleUpdateStatus = async () => {
    try {
      const result = await SweetAlert.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas actualizar el estado del servicio?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, actualizar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        // Actualiza el status en el backend
        const updatedTechService = await updateTechServiceStatus(techService.id, status);
        SweetAlert.fire("Actualizado", "El estado ha sido actualizado", "success");
        onClose(); // Cierra el modal
      }
    } catch (error) {
      SweetAlert.fire("Error", "Hubo un error al actualizar el estado", "error");
    }
}

  if (!serviceDetails) {
    return <div></div>; // Mostrar un mensaje de carga mientras se obtiene la información
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Detalles del Servicio Técnico</h2>

        {/* Información del cliente */}
        <div className="mb-4">
          <h3 className="text-lg font-medium">Cliente:</h3>
          <p><strong>Nombre:</strong> {serviceDetails.client.name}</p>
          <p><strong>Email:</strong> {serviceDetails.client.email}</p>
          <p><strong>Teléfono:</strong> {serviceDetails.client.phone}</p>
        </div>

        {/* Información del servicio técnico */}
        <div className="mb-4">
          <h3 className="text-lg font-medium">Detalles del Servicio:</h3>
          <p><strong>Estado:</strong> {serviceDetails.status}</p>
          <p><strong>Tipo de dispositivo:</strong> {serviceDetails.deviceType}</p>
          <p><strong>Serial/IMEI:</strong> {serviceDetails.serialNumber}</p>
          <p><strong>Marca:</strong> {serviceDetails.brand}</p>
          <p><strong>Modelo:</strong> {serviceDetails.color}</p>
          <p><strong>Contraseña:</strong> {serviceDetails.password}</p>
          <p><strong>Observaciones:</strong> {serviceDetails.observations}</p>
          <p><strong>Bodega:</strong> {serviceDetails.warehouseId === 1 ? "Barichara" : "Arrayanes"}</p>
          <p><strong>Fecha estimada de entrega:</strong> {new Date(serviceDetails.deliveryDate).toLocaleDateString()}</p>
        </div>

        {/* Cambio de estado */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado del servicio:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="EN_REPARACION">En Reparación</option>
            <option value="REPARADO">Reparado</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="GARANTIA">Garantía</option>
            <option value="DEVOLUCION">Devolución</option>
          </select>
        </div>

        <div className="flex justify-between">
          <Button onClick={onClose} variant="outline">Cerrar</Button>
          <Button onClick={handleUpdateStatus}>Actualizar Estado</Button>
        </div>
      </div>
    </div>
  );
};

export default TechServiceModal;
