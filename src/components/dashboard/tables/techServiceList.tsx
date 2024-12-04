"use client";

import React, { useState } from "react";
import { useTechServices } from "@/hooks/useTechServices";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TechServiceModal from "@/components/modal/techServiceModal";
import { TechServiceDetails } from "@/models/techservice";
import { useRouter } from "next/navigation";

const TechServiceList = () => {
  const [searchParams, setSearchParams] = useState({
    clientName: "",
    documentNumber: "",
    brand: "",
    color: "",
  });

  const [warehouseFilter, setWarehouseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>(""); // Nuevo estado para el filtrado por estado
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [selectedTechService, setSelectedTechService] = useState<TechServiceDetails | null>(null); // Establecer el tipo correcto
  const limit = 10;

  const { techServices, pagination, loading, error } = useTechServices({
    page: currentPage,
    limit,
    ...searchParams,
    warehouseId: warehouseFilter !== "all" ? warehouseFilter : undefined,
    status: statusFilter, // Pasar el filtro de estado
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWarehouseFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWarehouseFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Nueva función para manejar el cambio de estado
    setStatusFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when changing filter
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

    // Función para manejar el clic en un TechService
    const handleTechServiceClick = (techService: TechServiceDetails) => {
      setSelectedTechService(techService); // Establecer el TechService seleccionado
    };
  
    const handleCloseModal = () => {
      setSelectedTechService(null); // Cerrar el modal
      router.refresh();
    };

  return (
    <div className="container mx-auto px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          type="text"
          name="clientName"
          placeholder="Buscar por nombre"
          value={searchParams.clientName}
          onChange={handleSearchChange}
        />
        <Input
          type="text"
          name="documentNumber"
          placeholder="Buscar por documento"
          value={searchParams.documentNumber}
          onChange={handleSearchChange}
        />
        <Input
          type="text"
          name="brand"
          placeholder="Buscar por marca"
          value={searchParams.brand}
          onChange={handleSearchChange}
        />
        <Input
          type="text"
          name="color"
          placeholder="Buscar por modelo"
          value={searchParams.color}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-8">
        <div className="mb-6">
          <label
            htmlFor="warehouseFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por bodega:
          </label>
          <select
            id="warehouseFilter"
            name="warehouseFilter"
            value={warehouseFilter}
            onChange={handleWarehouseFilterChange}
            className="block w-40 text-center py-2 rounded-md border-gray-300 shadow-sm bg-gray-300 dark:bg-green-900/80 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Todos</option>
            <option value="1">Barichara</option>
            <option value="2">Arrayanes</option>
          </select>
        </div>

        {/* Nuevo filtro por estado */}
        <div className="mb-6">
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filtrar por estado:
          </label>
          <select
            id="statusFilter"
            name="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="block w-40 text-center py-2 rounded-md border-gray-300 shadow-sm bg-gray-300 dark:bg-green-900/80 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Todos</option>
            <option value="EN_REPARACION">EN REPARACION</option>
            <option value="REPARADO">REPARADO</option>
            <option value="ENTREGADO">ENTREGADO</option>
            <option value="GARANTIA">GARANTIA</option>
            <option value="DEVOLUCION">DEVOLUCION</option>
          </select>
        </div>
      </div>

      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Mostrar el modal si existe un TechService seleccionado */}
      {selectedTechService && (
        <TechServiceModal techService={selectedTechService} onClose={handleCloseModal} />
      )}

      <div className="md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-300 rounded">
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>IMEI/Serie</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Bodega</TableHead>
              <TableHead>Fecha estimada</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {techServices.map((techService) => (
              <TableRow
                key={techService.id}
                onClick={() => handleTechServiceClick(techService)} // Agregar evento de clic
                className="cursor-pointer"
              >
                <TableCell>{techService.client.name}</TableCell>
                <TableCell>{techService.status}</TableCell>
                <TableCell>{techService.deviceType}</TableCell>
                <TableCell>{techService.serialNumber}</TableCell>
                <TableCell>{techService.brand}</TableCell>
                <TableCell>{techService.color}</TableCell>
                <TableCell>
                  {techService.warehouseId === 1
                    ? "Barichara"
                    : techService.warehouseId === 2
                    ? "Arrayanes"
                    : techService.warehouseId}
                </TableCell>
                <TableCell>
                  {new Date(techService.deliveryDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {techServices.map((techService) => (
          <Card key={techService.id}>
            <CardHeader>
              <CardTitle>{techService.client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Estado:</strong> {techService.status}
              </p>
              <p>
                <strong>Tipo:</strong> {techService.deviceType}
              </p>
              <p>
                <strong>IMEI/Serie:</strong> {techService.serialNumber}
              </p>
              <p>
                <strong>Marca:</strong> {techService.brand}
              </p>
              <p>
                <strong>Modelo:</strong> {techService.color}
              </p>
              <p>
                <strong>Bodega:</strong>{" "}
                {techService.warehouseId === 1
                  ? "Barichara"
                  : techService.warehouseId === 2
                  ? "Arrayanes"
                  : techService.warehouseId}
              </p>
              <p>
                <strong>Fecha estimada:</strong>{" "}
                {new Date(techService.deliveryDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
        </Button>
        <span className="text-gray-900 dark:text-gray-200">
          Página {currentPage} de {pagination.totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pagination.totalPages}
          variant="outline"
        >
          Siguiente <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TechServiceList;
