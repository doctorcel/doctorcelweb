'use client'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/dashboard/TechServiceManagement.module.scss';

interface TechService {
  id: number;
  customerName: string;
  deviceType: string;
  issue: string;
  status: string;
  receivedDate: string;
}

export const TechServiceManagement: React.FC = () => {
  const [services, setServices] = useState<TechService[]>([]);

  useEffect(() => {
    // Aquí iría la lógica para cargar los servicios técnicos desde la API
    // Por ahora, usaremos datos de ejemplo
    setServices([
      { id: 1, customerName: 'Ana López', deviceType: 'Smartphone', issue: 'Pantalla rota', status: 'En progreso', receivedDate: '2024-03-14' },
      { id: 2, customerName: 'Carlos Ruiz', deviceType: 'Laptop', issue: 'No enciende', status: 'Pendiente', receivedDate: '2024-03-15' },
    ]);
  }, []);

  return (
    <div className={styles.techServiceManagement}>
      <h2>Gestión de Servicios Técnicos</h2>
      <button className={styles.addButton}>Nuevo Servicio</button>
      <table className={styles.serviceTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Dispositivo</th>
            <th>Problema</th>
            <th>Estado</th>
            <th>Fecha de Recepción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.customerName}</td>
              <td>{service.deviceType}</td>
              <td>{service.issue}</td>
              <td>{service.status}</td>
              <td>{service.receivedDate}</td>
              <td>
                <button className={styles.viewButton}>Ver</button>
                <button className={styles.updateButton}>Actualizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};