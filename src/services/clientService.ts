// src/services/clientService.ts

import { Client, CreateClientInput, UpdateClientInput } from '../models/client';

// Configura la base URL. En desarrollo, puedes usar rutas relativas.
const BASE_URL = '/api/client';

// Función para manejar respuestas
const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  let data;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const error = data?.error || response.statusText;
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
  }

  return data;
};

export const getClients = async (): Promise<Client[]> => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const getClientById = async (id: number): Promise<Client> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response);
};

export const createClient = async (input: CreateClientInput): Promise<Client> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return handleResponse(response);
};

export const updateClient = async (
  id: number,
  input: UpdateClientInput
): Promise<Client> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return handleResponse(response);
};
