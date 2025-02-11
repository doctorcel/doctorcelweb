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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TechServiceModal from "@/components/modal/techServiceModal";
import { TechServiceDetails } from "@/models/techservice";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TechServiceList = () => {
  const [searchParams, setSearchParams] = useState({
    clientName: "",
    documentNumber: "",
    brand: "",
    color: "",
  });

  const [warehouseFilter, setWarehouseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [selectedTechService, setSelectedTechService] = useState<TechServiceDetails | null>(null);
  const limit = 10;

  const { techServices, pagination, loading, error } = useTechServices({
    page: currentPage,
    limit,
    ...searchParams,
    warehouseId: warehouseFilter !== "all" ? warehouseFilter : undefined,
    status: statusFilter,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWarehouseFilterChange = (value: string) => {
    setWarehouseFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTechServiceClick = (techService: TechServiceDetails) => {
    setSelectedTechService(techService);
  };

  const handleCloseModal = () => {
    setSelectedTechService(null);
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="warehouseFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por bodega:
          </label>
          <Select onValueChange={handleWarehouseFilterChange} defaultValue={warehouseFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar bodega" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="3">Barichara</SelectItem>
              <SelectItem value="2">Guayabal</SelectItem>
              <SelectItem value="4">Bello</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por estado:
          </label>
          <Select onValueChange={handleStatusFilterChange} defaultValue={statusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="EN_REPARACION">EN REPARACION</SelectItem>
              <SelectItem value="REPARADO">REPARADO</SelectItem>
              <SelectItem value="ENTREGADO">ENTREGADO</SelectItem>
              <SelectItem value="GARANTIA">GARANTIA</SelectItem>
              <SelectItem value="DEVOLUCION">DEVOLUCION</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-center text-red-600">{error}</p>}

      {selectedTechService && (
        <TechServiceModal techService={selectedTechService} onClose={handleCloseModal} />
      )}

      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-300 dark:bg-gray-800">
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
                onClick={() => handleTechServiceClick(techService)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <TableCell>{techService.client.name}</TableCell>
                <TableCell>{techService.status}</TableCell>
                <TableCell>{techService.deviceType}</TableCell>
                <TableCell>{techService.serialNumber}</TableCell>
                <TableCell>{techService.brand}</TableCell>
                <TableCell>{techService.color}</TableCell>
                <TableCell>
                  {techService.warehouseId === 3
                    ? "Barichara"
                    : techService.warehouseId === 2
                    ? "Guayabal"
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

      <div className="md:hidden space-y-4">
        {techServices.map((techService) => (
          <Card key={techService.id} onClick={() => handleTechServiceClick(techService)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
            <CardHeader>
              <CardTitle>{techService.client.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <p><strong>Estado:</strong> {techService.status}</p>
                <p><strong>Tipo:</strong> {techService.deviceType}</p>
                <p><strong>IMEI/Serie:</strong> {techService.serialNumber}</p>
                <p><strong>Marca:</strong> {techService.brand}</p>
                <p><strong>Modelo:</strong> {techService.color}</p>
                <p><strong>Bodega:</strong> {techService.warehouseId === 3 ? "Barichara" : techService.warehouseId === 2 ? "Guayabal" : techService.warehouseId}</p>
                <p><strong>Fecha estimada:</strong> {new Date(techService.deliveryDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="w-full sm:w-auto"
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
          className="w-full sm:w-auto"
        >
          Siguiente <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TechServiceList;

