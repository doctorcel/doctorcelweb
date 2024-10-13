'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import { create } from 'zustand';
import PatronDesbloqueo from './patron';
import ClientForm from '../forms/createClient';
import Modal from '@/components/modal/modal';

interface ClientData {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    taxId?: string;
    documentType?: string;
    document?: string;
    personType?: string;
    regime?: string;
    country?: string;
    department?: string;
    city?: string;
}

type Client = ClientData;

// Zustand store
interface PasswordStore {
    password: string;
    setPassword: (password: string) => void;
}

const usePasswordStore = create<PasswordStore>((set) => ({
    password: '',
    setPassword: (password) => set({ password }),
}));

// Zustand store para el cliente
interface ClientStore {
    client: ClientData | null;
    setClient: (client: ClientData) => void;
}

const useClientStore = create<ClientStore>((set) => ({
    client: null,
    setClient: (client) => set({ client }),
}));


// Styled components (mantenemos los mismos estilos que antes)
const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0060df;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  background-color: #ffeeee;
  border: 1px solid red;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
`;

const SuccessMessage = styled.div`
  color: green;
  background-color: #eeffee;
  border: 1px solid green;
  padding: 10px;
  border-radius: 4px;
  margin-top: 20px;
`;

const PrintableContent = styled.div`
  display: none;
  @media print {
    display: block;
    padding: 20px;
    font-size: 12px;
  }
`;

interface TechServiceFormData {
    description: string;
    status: string;
    deviceType: string;
    serialNumber?: string;
    technicianId: string;
    warehouseId: string;
    deliveryDate?: string;
    brand?: string;
    color?: string;
    observations?: string;
    clientId?: string;
}

const TechServiceForm: React.FC = () => {
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [clients, setClients] = useState<Array<{ id: number; name: string }>>([]);
    const [formData, setFormData] = useState<TechServiceFormData>({
        description: '',
        status: '',
        deviceType: '',
        serialNumber: '',
        clientId: '',
        technicianId: '',
        warehouseId: '',
        deliveryDate: '',
        brand: '',
        color: '',
        observations: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [showClientForm, setShowClientForm] = useState(false);
    const { password, setPassword } = usePasswordStore();
    const { client, setClient } = useClientStore();

    const printRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('/api/client');
                if (!response.ok) {
                    throw new Error('Failed to fetch clients');
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('Error fetching clients');
            }
        };

        fetchClients();
    }, []);

    const handleOpenClientModal = () => {
        setIsClientModalOpen(true);
    };

    const handleCloseClientModal = () => {
        setIsClientModalOpen(false);
    };

    const handleClientCreated = (newClient: { id: number; name: string }) => {
        setClients(prevClients => [...prevClients, newClient]);
        setIsClientModalOpen(false);
        // Aquí puedes actualizar el formData con el nuevo clientId si es necesario
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePatronCompleto = (patron: string) => {
        setPassword(patron);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/tech-services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to create tech service');
            }

            const result = await response.json();
            console.log('Tech service created:', result);
            setSuccess(true);
            handlePrint();
        } catch (error) {
            console.error('Error creating tech service:', error);
            setError('Error al crear el servicio técnico. Por favor, intente de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description">Descripción:</Label>
                    <TextArea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="status">Estado:</Label>
                    <Select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Progreso">En Progreso</option>
                        <option value="Completado">Completado</option>
                    </Select>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="deviceType">Tipo de Dispositivo:</Label>
                    <Input
                        type="text"
                        id="deviceType"
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="serialNumber">Número de Serie:</Label>
                    <Input
                        type="text"
                        id="serialNumber"
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="clientId">Cliente:</Label>
                    <Select
                        id="clientId"
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un cliente</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id.toString()}>
                                {client.name}
                            </option>
                        ))}
                    </Select>
                    <Button type="button" onClick={handleOpenClientModal}>
                        Crear Nuevo Cliente
                    </Button>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="technicianId">ID del Técnico:</Label>
                    <Input
                        type="number"
                        id="technicianId"
                        name="technicianId"
                        value={formData.technicianId}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="warehouseId">ID del Almacén:</Label>
                    <Input
                        type="number"
                        id="warehouseId"
                        name="warehouseId"
                        value={formData.warehouseId}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="deliveryDate">Fecha de Entrega:</Label>
                    <Input
                        type="date"
                        id="deliveryDate"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="brand">Marca:</Label>
                    <Input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="color">Color:</Label>
                    <Input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="observations">Observaciones:</Label>
                    <TextArea
                        id="observations"
                        name="observations"
                        value={formData.observations}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Contraseña (Patrón de desbloqueo):</Label>
                    <PatronDesbloqueo onPatronCompleto={handlePatronCompleto} />
                    <p>Patrón actual: {password}</p>
                </FormGroup>

                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear Servicio Técnico'}
                </Button>
            </Form>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && <SuccessMessage>Servicio técnico creado con éxito.</SuccessMessage>}

            <PrintableContent ref={printRef}>
                <h2>Orden de Servicio Técnico</h2>
                <p><strong>Descripción:</strong> {formData.description}</p>
                <p><strong>Estado:</strong> {formData.status}</p>
                <p><strong>Tipo de Dispositivo:</strong> {formData.deviceType}</p>
                <p><strong>Número de Serie:</strong> {formData.serialNumber}</p>
                <p><strong>ID del Cliente:</strong> {formData.clientId}</p>
                <p><strong>ID del Técnico:</strong> {formData.technicianId}</p>
                <p><strong>ID del Almacén:</strong> {formData.warehouseId}</p>
                <p><strong>Fecha de Entrega:</strong> {formData.deliveryDate}</p>
                <p><strong>Marca:</strong> {formData.brand}</p>
                <p><strong>Color:</strong> {formData.color}</p>
                <p><strong>Observaciones:</strong> {formData.observations}</p>
                <p><strong>Contraseña:</strong> {password}</p>
                {client && (
                    <>
                        <h3>Información del Cliente</h3>
                        <p><strong>Nombre:</strong> {client.name}</p>
                        <p><strong>Email:</strong> {client.email}</p>
                        <p><strong>Teléfono:</strong> {client.phone}</p>
                    </>
                )}
            </PrintableContent>
            <Modal isOpen={isClientModalOpen} onClose={handleCloseClientModal}>
        <ClientForm
          onClientCreated={handleClientCreated}
          onCancel={handleCloseClientModal}
        />
      </Modal>
    </FormContainer>
    );
};

export default TechServiceForm;