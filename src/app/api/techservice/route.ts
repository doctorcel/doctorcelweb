import { PrismaClient, Status } from '@prisma/client';
import { NextResponse } from 'next/server';
import { CreateTechServiceDTO, UpdateTechServiceDTO, TechServiceResponse } from '@/models/techservice';

const prisma = new PrismaClient();

// ** POST: Crear un nuevo TechService **
export async function POST(req: Request) {
  try {
    const data: CreateTechServiceDTO = await req.json();


    // Crear el TechService en la base de datos
    const newTechService = await prisma.techService.create({
      data: {
        status: data.status,
        deviceType: data.deviceType,
        serialNumber: data.serialNumber || null,
        clientId: data.clientId,
        technicianId: data.technicianId || null,
        warehouseId: data.warehouseId,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        brand: data.brand || null,
        color: data.color || null,
        observations: data.observations || null,
        password: data.password || null,
        createdAt: data.createdAt || '',
      },
    });

    return NextResponse.json(newTechService, { status: 201 });
  } catch (error) {
    console.error('Error creating TechService:', error);
    return NextResponse.json({ message: 'Error creating TechService' }, { status: 500 });
  }
}

// ** GET: Obtener todos los TechServices o uno específico **
export async function GET(req: Request) {
  const url = new URL(req.url);

  // Parámetros de búsqueda
  const clientName = url.searchParams.get('clientName') || '';
  const documentNumber = url.searchParams.get('documentNumber') || '';
  const brand = url.searchParams.get('brand') || '';
  const color = url.searchParams.get('color') || '';
  const warehouseId = url.searchParams.get('warehouseId');

  // Parámetros de paginación
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    // Construir el filtro de búsqueda dinámicamente
    const filters: any = {};

    if (clientName) {
      filters.client = {
        name: {
          contains: clientName,
          mode: 'insensitive', // Ignorar mayúsculas y minúsculas
        },
      };
    }

    if (documentNumber) {
      filters.client = {
        ...filters.client,
        document: {
          contains: documentNumber,
          mode: 'insensitive',
        },
      };
    }

    if (brand) {
      filters.brand = {
        contains: brand,
        mode: 'insensitive',
      };
    }

    if (color) {
      filters.color = {
        contains: color,
        mode: 'insensitive',
      };
    }

    if (warehouseId) {
      filters.warehouseId = parseInt(warehouseId);
    }

    // Obtener los TechServices con los filtros y paginación, ordenados por createdAt (descendente)
    const techServices = await prisma.techService.findMany({
      where: filters,
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',  // Ordenar por fecha de creación más reciente
      },
      include: {
        client: true, // Para incluir los datos del cliente
        technician: true, // Si es necesario, incluir los datos del técnico
        warehouse: true, // Incluir los datos del warehouse
      },
    });

    // Contar el total de TechServices para calcular el número de páginas
    const totalTechServices = await prisma.techService.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalTechServices / limit);

    return NextResponse.json({
      data: techServices,
      pagination: {
        total: totalTechServices,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching TechService(s):', error);
    return NextResponse.json({ message: 'Error fetching TechService(s)' }, { status: 500 });
  }
}



// ** PATCH: Actualizar un TechService existente **
export async function PATCH(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  const data: UpdateTechServiceDTO = await req.json();

  try {
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Valid TechService ID is required' }, { status: 400 });
    }

    // Actualizar el TechService
    const techService = await prisma.techService.update({
      where: { id: parseInt(id) }, // Usamos parseInt(id) para asegurarnos de que sea un número
      data: {
        status: data.status,
        deviceType: data.deviceType,
        serialNumber: data.serialNumber,
        technicianId: data.technicianId,
        warehouseId: data.warehouseId,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : undefined,
        brand: data.brand,
        color: data.color,
        observations: data.observations,
        password: data.password,
      },
    });

    return NextResponse.json(techService, { status: 200 });
  } catch (error) {
    console.error('Error updating TechService:', error);
    return NextResponse.json({ message: 'Error updating TechService' }, { status: 500 });
  }
}
