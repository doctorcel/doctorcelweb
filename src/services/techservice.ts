import axios from 'axios';
import { CreateTechServiceDTO, UpdateTechServiceDTO, TechServiceResponse } from '@/models/techservice';


const API_URL = '/api/techservice';

// Definir las interfaces para las respuestas de la API

interface PaginationParams {
  page: number;
  limit: number;
}

interface SearchParams {
  clientName?: string;
  documentNumber?: string;
  brand?: string;
  color?: string;
  warehouseId?: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ** Función para crear un TechService **
export const createTechService = async (data: CreateTechServiceDTO): Promise<TechServiceResponse> => {
  try {
    const response = await axios.post<TechServiceResponse>(API_URL, data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating TechService:', error);
    throw new Error('Error creating TechService');
  }
};


export async function fetchTechServices({
  page = 1,
  limit = 10,
  clientName = '',
  documentNumber = '',
  brand = '',
  color = '',
  warehouseId = '',
  status = '',  // Agregar el parámetro 'status' para filtrar por estado
}: PaginationParams & SearchParams & { status?: string }) {
  try {
    // Construir la URL con los parámetros de búsqueda y paginación, incluyendo el 'status'
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      clientName,
      documentNumber,
      brand,
      color,
      warehouseId,
      status,  // Agregar el parámetro 'status' a los query params
    }).toString();

    const response = await fetch(`/api/techservice?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Error fetching TechServices');
    }

    const data = await response.json();

    return {
      techServices: data.data.filter((item: TechServiceResponse) => item.active === 'ENABLED'),  // Filtramos solo los servicios activos
      pagination: data.pagination
    };
  } catch (error) {
    console.error('Error fetching TechServices:', error);
    throw error;
  }
}


// ** Función para actualizar un TechService **
export const updateTechService = async (
  id: number,
  data: UpdateTechServiceDTO
): Promise<TechServiceResponse> => {
  try {
    const response = await axios.patch<ApiResponse<TechServiceResponse>>(`${API_URL}/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.error('Error updating TechService:', error);
    throw new Error('Error updating TechService');
  }
};

// Función para obtener el detalle del TechService y su Client
export const getTechServiceDetails = async (id: number) => {
  try {
    const response = await fetch(`/api/techservice/${id}`);
    if (!response.ok) {
      throw new Error('No se pudo obtener el TechService');
    }

    const data = await response.json();
    return data;  // Devuelve los detalles del TechService y el Cliente
  } catch (error) {
    console.error('Error al obtener el TechService:', error);
    throw error;
  }
};

// Función para actualizar el status de un TechService
export const updateTechServiceStatus = async (id: number, status: string) => {
  try {
    const response = await fetch(`/api/techservice/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el TechService');
    }

    const data = await response.json();
    return data;  // Devuelve el TechService actualizado
  } catch (error) {
    console.error('Error al actualizar el TechService:', error);
    throw error;
  }
};
