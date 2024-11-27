import { create } from 'zustand';

interface ClientStore {
  selectedClientId: number | null;
  setSelectedClientId: (id: number) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  selectedClientId: null,
  setSelectedClientId: (id: number) => set({ selectedClientId: id }),
}));
