'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/InvoiceManagement.module.scss';

interface Invoice {
  id: number;
  customerName: string;
  date: string;
  total: number;
  status: string;
}

export const InvoiceManagement: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    // Aquí iría la lógica para cargar las facturas desde la API
    // Por ahora, usaremos datos de ejemplo
    setInvoices([
      { id: 1, customerName: 'Juan Pérez', date: '2024-03-15', total: 699, status: 'Pagada' },
      { id: 2, customerName: 'María García', date: '2024-03-16', total: 499, status: 'Pendiente' },
    ]);
  }, []);

  return (
    <div className={styles.invoiceManagement}>
      <h2>Gestión de Facturas</h2>
      <button className={styles.addButton}>Crear Factura</button>
      <table className={styles.invoiceTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.date}</td>
              <td>${invoice.total}</td>
              <td>{invoice.status}</td>
              <td>
                <button className={styles.viewButton}>Ver</button>
                <button className={styles.editButton}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};