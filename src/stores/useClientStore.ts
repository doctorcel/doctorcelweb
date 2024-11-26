import { create } from 'zustand';
import { Client } from '@/models/client';

interface ClientStore {
  selectedClient: Client | null;
  setSelectedClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientStore>((set: any) => ({
  selectedClient: null,
  setSelectedClient: (client: Client | null) => set({ selectedClient: client }),
}));
