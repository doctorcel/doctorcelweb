// src/app/api/techservice/route.ts

import { PrismaClient, Prisma, Status, ActiveStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { CreateTechServiceDTO, CreateTechServiceSchema } from '@/models/techservice';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// ** POST: Crear un nuevo TechService **
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = CreateTechServiceSchema.parse(json); // Validación con Zod

    // Validar que el status es válido (redundante si se usa Zod, pero se mantiene por seguridad)
    if (!Object.values(Status).includes(data.status)) {
      return NextResponse.json(
        { message: `Status inválido: ${data.status}` },
        { status: 400 }
      );
    }

    // Validar que ActiveStatus es válido si se proporciona
    if (data.active && !Object.values(ActiveStatus).includes(data.active)) {
      return NextResponse.json(
        { message: `ActiveStatus inválido: ${data.active}` },
        { status: 400 }
      );
    }

    // Verificar que el cliente exista
    const clientExists = await prisma.client.findUnique({
      where: { id: data.clientId },
    });
    if (!clientExists) {
      return NextResponse.json(
        { message: `Cliente con ID ${data.clientId} no encontrado.` },
        { status: 404 }
      );
    }

    // Verificar que el warehouse exista
    const warehouseExists = await prisma.warehouse.findUnique({
      where: { id: data.warehouseId },
    });
    if (!warehouseExists) {
      return NextResponse.json(
        { message: `Almacén con ID ${data.warehouseId} no encontrado.` },
        { status: 404 }
      );
    }

    // Si se proporciona technicianId, verificar que el técnico exista y tenga el rol correcto
    if (data.technicianId) {
      const technician = await prisma.user.findUnique({
        where: { id: data.technicianId },
      });
      if (!technician) {
        return NextResponse.json(
          { message: `Técnico con ID ${data.technicianId} no encontrado.` },
          { status: 404 }
        );
      }
      if (technician.role !== 'TECHNICIAN') {
        return NextResponse.json(
          { message: `El usuario con ID ${data.technicianId} no es un técnico.` },
          { status: 400 }
        );
      }
    }

    // Crear el TechService en la base de datos
    const newTechService = await prisma.techService.create({
      data: {
        status: data.status,
        deviceType: data.deviceType,
        createdAt: data.createdAt,
        serialNumber: data.serialNumber || null,
        clientId: data.clientId,
        technicianId: data.technicianId || null,
        warehouseId: data.warehouseId,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        brand: data.brand || null,
        color: data.color || null,
        observations: data.observations || null,
        password: data.password || null, // Contraseña del equipo
        active: data.active || ActiveStatus.ENABLED,
      },
    });

    return NextResponse.json(newTechService, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validación de datos fallida', errors: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Manejar errores conocidos de Prisma
      if (error.code === 'P2002') {
        // Violación de restricción única
        const duplicatedField = error.meta?.target;
        return NextResponse.json(
          { error: `El campo ${duplicatedField} ya existe.` },
          { status: 409 }
        );
      }
    }

    console.error('Error creando TechService:', error);
    return NextResponse.json(
      { error: 'Error creando TechService', details: error.message },
      { status: 500 }
    );
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
  const status = url.searchParams.get('status');  // Filtro por status

  // Parámetros de paginación
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    // Construir el filtro de búsqueda dinámicamente
    const filters: any = {
      active: 'ENABLED',  // Solo TechServices activos
    };

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

    if (status) {
      filters.status = status;  // Filtro por status
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
        technician: true, // Incluir los datos del técnico
        warehouse: true, // Incluir los datos del warehouse
      },
    });

    // Contar el total de TechServices para calcular el número de páginas
    const totalTechServices = await prisma.techService.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalTechServices / limit);

    return NextResponse.json(
      {
        data: techServices,
        pagination: {
          total: totalTechServices,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching TechService(s):', error);
    return NextResponse.json(
      { message: 'Error obteniendo TechService(s)' },
      { status: 500 }
    );
  }
}
