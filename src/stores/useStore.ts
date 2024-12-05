import {create} from 'zustand';

type InvoiceStore = {
  client: any | null;
  items: { articleId: number; quantity: number; price: number; name: string, subtotal:number, discount:number }[];
  setClient: (client: any) => void;
  addItem: (item: { articleId: number; quantity: number; price: number; name: string, subtotal:number, discount:number  }) => void;
  removeItem: (articleId: number) => void;
  clearItems: () => void;
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  client: null,
  items: [],
  setClient: (client) => set({ client }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (articleId) => set((state) => ({ items: state.items.filter(item => item.articleId !== articleId) })),
  clearItems: () => set({ items: [] })
}));
