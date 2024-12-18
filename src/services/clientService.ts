// src/services/clientService.ts

import axiosInstance from './axiosInstance';
import { Client, CreateClientInput, UpdateClientInput } from '../models/client';

export const getClients = async (): Promise<Client[]> => {
  const response = await axiosInstance.get<Client[]>('/');
  return response.data;
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await axiosInstance.get<Client>(`/${id}`);
  return response.data;
};

export const createClient = async (input: CreateClientInput): Promise<Client> => {
  const response = await axiosInstance.post<Client>('/', input);
  return response.data;
};

export const updateClient = async (
  id: number,
  input: UpdateClientInput
): Promise<Client> => {
  const response = await axiosInstance.patch<Client>(`/${id}`, input);
  return response.data;
};
