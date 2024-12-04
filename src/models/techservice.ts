import { Status } from '@prisma/client';

export interface CreateTechServiceDTO {
  status: Status;
  deviceType: string;
  serialNumber?: string;
  clientId: number;
  technicianId?: number;
  warehouseId: number;
  deliveryDate?: string; // ISO date string
  brand?: string;
  color?: string;
  observations?: string;
  password?: string;
  createdAt?: string;

}

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

