// services/warehouseService.ts

import { Warehouse } from '@prisma/client';

// Obtener todas las bodegas
export const getWarehouses = async (): Promise<Warehouse[]> => {
  try {
    const response = await fetch('/api/warehouses', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de obtener el token de un lugar seguro
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al obtener las bodegas');
    }

    const data: Warehouse[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de obtener el token de un lugar seguro
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error('Error al crear la bodega');
    }

    const data: Warehouse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de obtener el token de un lugar seguro
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la bodega');
    }

    const data: Warehouse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Eliminar una bodega
export const deleteWarehouse = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/warehouses?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de obtener el token de un lugar seguro
      },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la bodega');
    }

    await response.json(); // Si es necesario
  } catch (error) {
    console.error(error);
    throw error;
  }
};
