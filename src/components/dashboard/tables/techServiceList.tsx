'use client'

import React, { useState } from 'react'
import { useTechServices } from '@/hooks/useTechServices'
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TechServiceList = () => {
  const [searchParams, setSearchParams] = useState({
    clientName: '',
    documentNumber: '',
    brand: '',
    color: '',
  })

  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 10

  const { techServices, pagination, loading, error } = useTechServices({
    page: currentPage,
    limit,
    ...searchParams,
    warehouseId: warehouseFilter !== 'all' ? warehouseFilter : undefined, // Cambiar solo si no es "all"
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleWarehouseFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Warehouse Filter Changed: ", e.target.value); // Verifica que el valor cambie
    setWarehouseFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when changing filter
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

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

      <div className="mb-6">
        <label htmlFor="warehouseFilter" className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por bodega:
        </label>
        <select
          id="warehouseFilter"
          name="warehouseFilter"
          value={warehouseFilter}
          onChange={handleWarehouseFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="1">Barichara</option>
          <option value="2">Arrayanes</option>
        </select>
      </div>

      {loading && <p className="text-center text-gray-900">Cargando...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Desktop view */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
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
              <TableRow key={techService.id}>
                <TableCell>{techService.client.name}</TableCell>
                <TableCell>{techService.status}</TableCell>
                <TableCell>{techService.deviceType}</TableCell>
                <TableCell>{techService.serialNumber}</TableCell>
                <TableCell>{techService.brand}</TableCell>
                <TableCell>{techService.color}</TableCell>
                <TableCell>
                  {techService.warehouseId === 1 ? 'Barichara' : techService.warehouseId === 2 ? 'Arrayanes' : techService.warehouseId}
                </TableCell>
                <TableCell>{new Date(techService.deliveryDate).toLocaleDateString()}</TableCell>
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
              <p><strong>Estado:</strong> {techService.status}</p>
              <p><strong>Tipo:</strong> {techService.deviceType}</p>
              <p><strong>IMEI/Serie:</strong> {techService.serialNumber}</p>
              <p><strong>Marca:</strong> {techService.brand}</p>
              <p><strong>Modelo:</strong> {techService.color}</p>
              <p><strong>Bodega:</strong> {techService.warehouseId === 1 ? 'Barichara' : techService.warehouseId === 2 ? 'Arrayanes' : techService.warehouseId}</p>
              <p><strong>Fecha estimada:</strong> {new Date(techService.deliveryDate).toLocaleDateString()}</p>
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
        <span className="text-gray-900">
          Pagina {currentPage} de {pagination.totalPages}
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
  )
}

export default TechServiceList

