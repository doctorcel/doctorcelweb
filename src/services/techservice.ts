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
  warehouseId?: number;
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
  warehouseId = 1,
}: PaginationParams & SearchParams) {
  try {
    // Construir la URL con los parámetros de búsqueda y paginación
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      clientName,
      documentNumber,
      brand,
      color,
    }).toString();

    const response = await fetch(`/api/techservice?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Error fetching TechServices');
    }

    const data = await response.json();

    return {
      techServices: data.data,
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
