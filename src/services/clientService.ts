import { Client } from '@/models/client';

const API_URL = '/api/client';

// Crear cliente
export const createClient = async (clientData: Client): Promise<Client> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  });

  if (!response.ok) {
    throw new Error('Error al crear el cliente');
  }

  return response.json();
};

// Obtener todos los clientes
export const getClients = async (): Promise<Client[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Error al obtener los clientes');
  }

  return response.json();
};

// Actualizar cliente
export const updateClient = async (clientId: number, updatedData: Partial<Client>): Promise<Client> => {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: clientId,
      ...updatedData,
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el cliente');
  }

  return response.json();
};

// Obtener cliente por ID
export const getClientById = async (clientId: number): Promise<Client> => {
  const response = await fetch(`${API_URL}/${clientId}`);

  if (!response.ok) {
    throw new Error('Error al obtener el cliente');
  }

  return response.json();
};
