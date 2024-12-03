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
