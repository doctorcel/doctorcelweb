import { InvoicesResponse, CreateInvoiceRequest, Invoice, UpdateInvoiceStatusRequest } from '@/models/invoice';

export const fetchInvoices = async (params: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  timeFrame?: 'day' | 'week' | 'month';
  sortBy?: 'date' | 'total';
  sortOrder?: 'asc' | 'desc';
}): Promise<InvoicesResponse> => {
  const url = new URL('/api/invoices', window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString(), {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Error fetching invoices');
  }

  const data: InvoicesResponse = await response.json();
  return data;
};


export const createInvoice = async (invoiceData: CreateInvoiceRequest): Promise<Invoice> => {
  const response = await fetch('/api/invoices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(invoiceData),
  });

  if (!response.ok) {
    throw new Error('Error creating invoice');
  }

  const data: Invoice = await response.json();
  return data;
};


export const updateInvoiceStatus = async (invoiceId: number, statusData: UpdateInvoiceStatusRequest): Promise<Invoice> => {
  const response = await fetch(`/api/invoices?id=${invoiceId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statusData),
  });

  if (!response.ok) {
    throw new Error('Error updating invoice status');
  }

  const data: Invoice = await response.json();
  return data;
};
