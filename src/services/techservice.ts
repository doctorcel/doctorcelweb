import axios from 'axios';
import { CreateTechServiceDTO, UpdateTechServiceDTO, TechServiceResponse } from '@/models/techservice';


const API_URL = '/api/techservice';

// Definir las interfaces para las respuestas de la API
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

// ** Función para obtener todos los TechServices o uno específico **
export const getTechServices = async (id?: number): Promise<TechServiceResponse[]> => {
  try {
    const url = id ? `${API_URL}?id=${id}` : API_URL;
    const response = await axios.get<ApiResponse<TechServiceResponse[]>>(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching TechServices:', error);
    throw new Error('Error fetching TechServices');
  }
};

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
