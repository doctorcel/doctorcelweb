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
  const id = url.searchParams.get('id');

  try {
    if (id) {
      // Obtener un solo TechService por id
      const techService = await prisma.techService.findUnique({
        where: { id: parseInt(id) },
      });

      if (!techService) {
        return NextResponse.json({ message: 'TechService not found' }, { status: 404 });
      }

      return NextResponse.json(techService, { status: 200 });
    } else {
      // Obtener todos los TechServices
      const techServices = await prisma.techService.findMany();
      return NextResponse.json(techServices, { status: 200 });
    }
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
