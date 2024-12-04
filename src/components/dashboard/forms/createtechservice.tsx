"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTechService } from "@/services/techservice";
import { getClients } from "@/services/clientService";
import { getWarehouses } from "@/services/warehouses";
import { CreateTechServiceDTO } from "@/models/techservice";
import { Status } from "@prisma/client";
import { Button } from "@/components/ui/Button";
import { getClientById } from "@/services/clientService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Client } from "@/models/client";
import TechServiceReceipt from "../print/techservicereceipt";
import CreateClient from "@/components/ui/createClient";

type DeviceType =
  | "celular"
  | "consola"
  | "control"
  | "computador"
  | "parlante"
  | "otro";

const TechServiceForm = () => {
  // Estado para los campos del formulario
  const [deviceType, setDeviceType] = useState<DeviceType>("celular");
  const [brand, setBrand] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [status, setStatus] = useState<Status>("EN_REPARACION");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [color, setColor] = useState("");
  const [observations, setObservations] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState<number | null>(null); // Cambiar a solo un número
  const [warehouseId, setWarehouseId] = useState<number | null>(null);
  const [isPrinting, setIsPrinting] = useState<boolean>(false); // Estado para saber si estamos imprimiendo
  const [techServiceData, setTechServiceData] = useState<any | null>(null); // Estado para guardar la data del recibo
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  // Estado para manejar los mensajes de error y éxito
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Estado para manejar la búsqueda de cliente
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]); // Cambio a Client[] para almacenar los clientes
  const [warehouses, setWarehouses] = useState<any[]>([]); // Estado para las bodegas
  const [brandOptions, setBrandOptions] = useState<string[]>([]);

  // Opciones de marcas por tipo de dispositivo
  const brandData: Record<DeviceType, string[]> = {
    celular: [
      "Samsung",
      "Apple",
      "Motorola",
      "Huawei",
      "Honor",
      "Xiaomi",
      "Infinix",
      "Realme",
      "Oppo",
      "LG",
      "Otra",
    ],
    consola: ["Playstation", "Xbox", "Nintendo"],
    control: ["Playstation", "Xbox", "Nintendo"],
    computador: [
      "Apple",
      "Hp",
      "Acer",
      "Asus",
      "Lenovo",
      "Dell",
      "MSI",
      "Otro",
    ],
    parlante: ["Sony", "Bose", "Jbl", "Generico"],
    otro: ["Generico"],
  };

  // Efecto para cargar bodegas
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const fetchedWarehouses = await getWarehouses();
        setWarehouses(fetchedWarehouses);
        setBrandOptions(brandData[deviceType]);
      } catch (error) {
        setErrorMessage("Hubo un error al cargar las bodegas.");
      }
    };

    fetchWarehouses();
  }, [deviceType]);

  // Efecto para cargar los clientes solo cuando haya una búsqueda activa
  useEffect(() => {
    const fetchClients = async () => {
      if (searchQuery.trim() === "") {
        setFilteredClients([]); // Si no hay búsqueda, no mostrar clientes
        return;
      }

      try {
        const fetchedClients = await getClients();
        const filtered = fetchedClients.filter((client) =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredClients(filtered); // Filtrar clientes basados en la búsqueda
      } catch (error) {
        setErrorMessage("Hubo un error al cargar los clientes.");
      }
    };

    fetchClients();
  }, [searchQuery]); // Solo se ejecuta cuando searchQuery cambia

  // Función que se llama cuando el formulario es enviado
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const data: CreateTechServiceDTO = {
      deviceType,
      brand,
      serialNumber,
      status,
      deliveryDate,
      color,
      observations,
      password,
      clientId: clientId ?? 1, // Se debe ajustar dinámicamente
      warehouseId: warehouseId || 1, // Se debe ajustar dinámicamente
      createdAt: new Date()
        .toLocaleString("es-CO", { timeZone: "America/Bogota" })
        .toString(),
    };

    const newTechService = await createTechService(data);
    setTechServiceData(newTechService);
    if (newTechService) {
      // Fetch client data
      const clientData: Client = await getClientById(newTechService.clientId);

      // Combine tech service and client data
      const combinedData = {
        ...newTechService,
        client: {
          name: clientData.name,
          email: clientData.email,
          phone: clientData.phone,
          address: clientData.address,
          taxId: clientData.taxId,
          documentType: clientData.documentType,
          document: clientData.document,
          personType: clientData.personType,
          regime: clientData.regime,
          country: clientData.country,
          department: clientData.department,
          city: clientData.city,
        },
      };
      console.log(combinedData);
      setTechServiceData(combinedData);
      setIsModalOpen(true);
    }
  };

  const handlePrintSuccess = () => {
    if (techServiceData) {
      setIsModalOpen(false);
      router.push("/dashboard/techservice");
      return;
    }
    // Después de imprimir el recibo, redirigir a la página del dashboard
  };

  // Función que se llama cuando se selecciona un cliente
  const handleClientSelect = (client: Client) => {
    setClientId(client.id); // Guardamos solo el id del cliente
    setSearchQuery(client.name); // Establecemos el nombre del cliente en la búsqueda
    setFilteredClients([]); // Limpiamos los resultados de búsqueda
  };

  return (
    <>
      <div className="flex justify-around items-center bg-gray-300 dark:bg-gray-900 dark:text-gray-300 p-8">
        <div className="ml-12 mr-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Crear orden de servicio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            En esta sección, puedes crear la orden de servicio, verifica que
            ingreses toda la información correctamente.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="bg-blue-900 dark:bg-green-900 text-gray-100 dark:hover:bg-green-700 dark:text-white">
            <Link href={"/dashboard/techservice"}>Regresar</Link>
          </Button>
          <CreateClient />
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg mt-8 mb-8 dark:text-gray-200">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 border-l-4 border-red-500 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 border-l-4 border-green-500 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="flex flex-col">
              <label
                htmlFor="deviceType"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Tipo de dispositivo
              </label>
              <select
                id="deviceType"
                value={deviceType}
                required
                onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                className="p-3 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:border-gray-700 focus:border-transparent"
              >
                <option value="Celular">Celular</option>
                <option value="Consola">Consola</option>
                <option value="Control">Control</option>
                <option value="Computador">Computador</option>
                <option value="Parlante">Parlante</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="brand"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Marca
              </label>
              <select
                id="brand"
                value={brand}
                required
                onChange={(e) => setBrand(e.target.value)}
                className="p-3 border border-gray-300 rounded-md bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700  focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Selecciona una marca</option>
                {brandOptions.map((brandOption) => (
                  <option key={brandOption} value={brandOption}>
                    {brandOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="serialNumber"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Número de serie / IMEI
              </label>
              <input
                type="text"
                id="serialNumber"
                value={serialNumber}
                required
                onChange={(e) => setSerialNumber(e.target.value)}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="deliveryDate"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Fecha de posible entrega
              </label>
              <input
                type="date"
                id="deliveryDate"
                value={deliveryDate}
                required
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="color"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Modelo
              </label>
              <input
                type="text"
                id="color"
                value={color}
                required
                onChange={(e) => setColor(e.target.value)}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Contraseña
              </label>
              <input
                type="text"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {/* Campo de cliente con autocompletado */}
            <div className="flex flex-col">
              <label
                htmlFor="clientSearch"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Buscar Cliente
              </label>
              <input
                id="clientSearch"
                type="text"
                value={searchQuery}
                required
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Escribe el nombre del cliente"
              />
              {/* Mostrar los resultados de la búsqueda */}
              {filteredClients.length > 0 && (
                <div className="mt-2 border border-gray-300 bg-white shadow-md rounded-md max-h-60 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className="p-2 hover:bg-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 "
                      onClick={() => handleClientSelect(client)} // Seleccionar cliente
                    >
                      {client.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resto de campos */}
            <div className="flex flex-col">
              <label
                htmlFor="warehouseId"
                className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
              >
                Bodega
              </label>
              <select
                id="warehouseId"
                value={warehouseId || ""}
                required
                onChange={(e) => setWarehouseId(Number(e.target.value))}
                className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Selecciona una bodega</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="observations"
              className="text-sm font-medium text-gray-700 dark:text-gray-100 mb-1"
            >
              Observaciones
            </label>
            <textarea
              id="observations"
              value={observations}
              required
              onChange={(e) => setObservations(e.target.value)}
              className="p-3 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700  bg-white shadow-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              rows={4}
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-900 dark:bg-green-900 text-gray-100 dark:hover:bg-green-700 dark:text-white dark:border-gray-700 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
            >
              Crear Orden
            </button>
          </div>
        </form>
      </div>

      {/* Si los datos del recibo están disponibles y estamos imprimiendo, renderizar el recibo */}
      {techServiceData && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Recibo de Servicio Técnico</DialogTitle>
            </DialogHeader>
            <TechServiceReceipt
              techService={techServiceData}
              logoUrl="/logo.png"
              companyName="Doctor Cel"
              companyContact="contacto@doctorcel.co"
              onPrintSuccess={handlePrintSuccess}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default TechServiceForm;
