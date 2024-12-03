import { useState, useEffect } from 'react';
import { fetchTechServices } from '@/services/techservice';

interface Pagination {
  total: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface UseTechServicesParams {
  page?: number;
  limit?: number;
  clientName?: string;
  documentNumber?: string;
  brand?: string;
  color?: string;
  warehouseId?: string;
  status: string;
}

export function useTechServices({
  page = 1,
  limit = 10,
  clientName = '',
  documentNumber = '',
  brand = '',
  color = '',
  warehouseId,
  status
}: UseTechServicesParams) {
  const [techServices, setTechServices] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    totalPages: 0,
    currentPage: page,
    perPage: limit,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTechServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const { techServices, pagination } = await fetchTechServices({
          page,
          limit,
          clientName,
          documentNumber,
          brand,
          color,
          warehouseId,
          status
        });
        setTechServices(techServices);
        setPagination(pagination);
      } catch (error) {
        setError('Error fetching tech services');
      } finally {
        setLoading(false);
      }
    };

    loadTechServices();
  }, [page, limit, clientName, documentNumber, brand, color, warehouseId, status]);

  return {
    techServices,
    pagination,
    loading,
    error,
  };
}

