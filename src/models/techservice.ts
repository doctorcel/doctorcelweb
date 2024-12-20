import { Status } from '@prisma/client';
// models/techservice.ts


export interface UpdateTechServiceDTO {
  status?: Status;
  deviceType?: string;
  serialNumber?: string;
  technicianId?: number;
  warehouseId?: number;
  deliveryDate?: string;
  brand?: string;
  color?: string;
  observations?: string;
  password?: string;
}

export interface TechServiceResponse {
  active: string;
  id: number;
  status: Status;
  deviceType: string;
  serialNumber: string | null;
  clientId: number;
  technicianId: number | null;
  warehouseId: number;
  deliveryDate: string | null;
  brand: string | null;
  color: string | null;
  observations: string | null;
  password: string | null;
}

export interface TechServiceDetails {
  id: number;
  client: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  deviceType: string;
  serialNumber: string;
  brand: string;
  color: string;
  warehouseId: number;
  deliveryDate: string;
  observations: string | null;
  password: string | null;
}

// src/models/techservice.ts

import { z } from 'zod';

export const CreateTechServiceSchema = z.object({
  status: z.enum(['EN_REPARACION', 'REPARADO', 'ENTREGADO', 'GARANTIA', 'DEVOLUCION']),
  deviceType: z.string().min(1, 'El tipo de dispositivo es requerido'),
  serialNumber: z.string().optional(),
  createdAt: z.string().optional(),
  clientId: z.number(),
  technicianId: z.string().optional(),
  warehouseId: z.number(),
  deliveryDate: z.string().optional(), // Asegúrate de manejar el formato de fecha
  brand: z.string().optional(),
  color: z.string().optional(),
  observations: z.string().optional(),
  password: z.string().optional(), // Contraseña del equipo
  active: z.enum(['ENABLED', 'DISABLED']).optional(),
});

export type CreateTechServiceDTO = z.infer<typeof CreateTechServiceSchema>;
