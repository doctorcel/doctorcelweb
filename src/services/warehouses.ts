// services/warehouseService.ts

import { Warehouse } from '@prisma/client';

// Obtener todas las bodegas
export const getWarehouses = async (): Promise<Warehouse[]> => {
  try {
    const response = await fetch('/api/warehouses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al obtener las bodegas');
    }

    const data: Warehouse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener las bodegas:', error);
    throw error;
  }
};

// Crear una nueva bodega
export const createWarehouse = async (name: string, description: string): Promise<Warehouse> => {
  try {
    const response = await fetch('/api/warehouses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
      // Las cookies de sesión se envían automáticamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear la bodega');
    }

    const data: Warehouse = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la bodega:', error);
    throw error;
  }
};

// Actualizar una bodega
export const updateWarehouse = async (id: number, name: string, description: string): Promise<Warehouse> => {
  try {
    const response = await fetch(`/api/warehouses?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
      // Las cookies de sesión se envían automáticamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar la bodega');
    }

    const data: Warehouse = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar la bodega:', error);
    throw error;
  }
};

// Eliminar una bodega
export const deleteWarehouse = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/warehouses?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      // Las cookies de sesión se envían automáticamente
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al eliminar la bodega');
    }

    await response.json(); // Si es necesario
  } catch (error) {
    console.error('Error al eliminar la bodega:', error);
    throw error;
  }
};
