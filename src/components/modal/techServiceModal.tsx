'use client'

import React, { useEffect, useState } from "react";
import { getTechServiceDetails, updateTechServiceStatus } from "@/services/techservice";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PhoneIcon as DevicePhoneMobileIcon, UserIcon } from 'lucide-react';
import SweetAlert from "sweetalert2";
import { TechServiceDetails } from "@/models/techservice";

interface TechServiceModalProps {
  techService: TechServiceDetails;
  onClose: () => void;
}

const TechServiceModal: React.FC<TechServiceModalProps> = ({ techService, onClose }) => {
  const [serviceDetails, setServiceDetails] = useState<TechServiceDetails | null>(null);
  const [status, setStatus] = useState<string>(techService.status);

  useEffect(() => {
    const fetchTechServiceDetails = async () => {
      try {
        const data = await getTechServiceDetails(techService.id);
        setServiceDetails(data);
      } catch (error) {
        console.error("Error al obtener los detalles del TechService:", error);
      }
    };

    fetchTechServiceDetails();
  }, [techService.id]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

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
        await updateTechServiceStatus(techService.id, status);
        SweetAlert.fire("Actualizado", "El estado ha sido actualizado", "success");
        onClose();
      }
    } catch (error) {
      SweetAlert.fire("Error", "Hubo un error al actualizar el estado", "error");
    }
  }

  if (!serviceDetails) {
    return <div className="flex justify-center items-center h-full">Cargando...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Detalles del Servicio Técnico
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold flex items-center mb-2 text-gray-800 dark:text-gray-100">
                <UserIcon className="mr-2" size={20} />
                Información del Cliente
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Nombre:</strong> {serviceDetails.client.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Email:</strong> {serviceDetails.client.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Teléfono:</strong> {serviceDetails.client.phone}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold flex items-center mb-2 text-gray-800 dark:text-gray-100">
                <DevicePhoneMobileIcon className="mr-2" size={20} />
                Detalles del Dispositivo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Tipo:</strong> {serviceDetails.deviceType}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Serial/IMEI:</strong> {serviceDetails.serialNumber}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Marca:</strong> {serviceDetails.brand}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Modelo:</strong> {serviceDetails.color}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Contraseña:</strong> {serviceDetails.password}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold flex items-center mb-2 text-gray-800 dark:text-gray-100">
                <CalendarIcon className="mr-2" size={20} />
                Detalles del Servicio
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Estado:</strong> 
                <Badge className="ml-2" variant={status === 'EN_REPARACION' ? 'default' : 'secondary'}>
                  {status === 'EN_REPARACION' ? 'En Reparación' : 
                   status === 'REPARADO' ? 'Reparado' :
                   status === 'ENTREGADO' ? 'Entregado' :
                   status === 'GARANTIA' ? 'Garantía' : 'Devolución'}
                </Badge>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Bodega:</strong> {serviceDetails.warehouseId === 3 ? "Barichara" : "Guayabal"}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Fecha estimada de entrega:</strong> {new Date(serviceDetails.deliveryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Observaciones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{serviceDetails.observations}</p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Actualizar Estado</h3>
              <Select onValueChange={handleStatusChange} defaultValue={status}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN_REPARACION">En Reparación</SelectItem>
                  <SelectItem value="REPARADO">Reparado</SelectItem>
                  <SelectItem value="ENTREGADO">Entregado</SelectItem>
                  <SelectItem value="GARANTIA">Garantía</SelectItem>
                  <SelectItem value="DEVOLUCION">Devolución</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <Button onClick={onClose} variant="outline">Cerrar</Button>
          <Button onClick={handleUpdateStatus}>Actualizar Estado</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TechServiceModal;

