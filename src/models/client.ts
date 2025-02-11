// src/models/client.ts

export type ActiveStatus = 'ENABLED' | 'DISABLED';

export interface Invoice {
  id: number;
  number: number;
  date: string; // ISO date string
  total: number;
  clientId: number;
  companyInfoId?: number;
  clientName: string;
  clientAddress?: string;
  clientPhone?: string;
  clientEmail?: string;
  clientTaxId?: string;
  warehouseId: number;
  active: ActiveStatus;
  notes?: string;
  // Add other fields as necessary
}

export interface Order {
  id: number;
  number: number;
  createdAt: string; // ISO date string
  total: number;
  status: string;
  clientId: number;
  // Add other fields as necessary
}

export interface TechService {
  id: number;
  createdAt: string; // Assuming it's a string as per your schema
  status: 'EN_REPARACION' | 'REPARADO' | 'ENTREGADO' | 'GARANTIA' | 'DEVOLUCION';
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
  active: ActiveStatus;
  // Add other fields as necessary
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  documentType: string;
  document: string;
  personType: string;
  regime: string;
  country: string;
  department: string;
  city: string;
  createdAt: Date; // ISO date string
  active: ActiveStatus;
  invoices: Invoice[];
  orders: Order[];
  techServices: TechService[];
}

export interface CreateClientInput {
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  taxId: string | null;
  documentType: string | null;
  document: string | null;
  personType: string | null;
  regime: string | null;
  country: string | null;
  department: string | null;
  city: string | null;
}

export interface UpdateClientInput {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  taxId?: string;
  documentType?: string;
  personType?: string;
  regime?: string;
  country?: string;
  department?: string;
  city?: string;
  document?: string;
  active?: 'ENABLED' | 'DISABLED';
}