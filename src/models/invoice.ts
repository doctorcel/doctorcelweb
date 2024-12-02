export interface Invoice {
  id: number;
  clientName: string;
  total: number;
  date: string;
  active: "ENABLED" | "DISABLED";
  client: {
    name: string;
    email: string;
  };
  items: {
    articleId: number;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SalesSummary {
  totalSales: number;
  averageSale: number;
}

export interface TopProduct {
  articleId: number;
  quantity: number;
  subtotal: number;
  articleName: string;
}

// Respuesta general para la obtención de facturas
export interface InvoicesResponse {
  invoices: Invoice[];
  pagination: Pagination;
  salesSummary: SalesSummary;
  topProducts: TopProduct[];
}

export interface InvoiceItem {
  articleId: number;
  quantity: number;
  price: number;
  cost?: number;
  discount?: number;
}

export interface CreateInvoiceRequest {
  clientId: number;
  companyInfoId: number;
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  clientTaxId: string;
  warehouseId: number;
  items: InvoiceItem[];
  total: number;
}

export interface UpdateInvoiceStatusRequest {
  active: "ENABLED" | "DISABLED";
}
