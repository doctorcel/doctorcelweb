import prisma from '@/lib/prisma';  // Asegúrate de tener el prisma client configurado
import { NextResponse } from 'next/server';

// Obtener un TechService por su ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const techService = await prisma.techService.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,        // Incluir los detalles del cliente
        warehouse: true,     // Incluir la bodega relacionada
        technician: true,    // Incluir el técnico (si existe)
      },
    });

    if (!techService) {
      return NextResponse.json({ message: 'TechService no encontrado' }, { status: 404 });
    }

    return NextResponse.json(techService, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el TechService:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// Actualizar el status de un TechService
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { status } = await request.json();  // Obtener el nuevo status desde el body de la solicitud

    // Validación simple para el status
    if (!status || !['EN_REPARACION', 'REPARADO', 'ENTREGADO', 'GARANTIA', 'DEVOLUCION'].includes(status)) {
      return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
    }

    // Actualizar el TechService
    const updatedTechService = await prisma.techService.update({
      where: { id: parseInt(id) },
      data: {
        status,  // Solo actualizamos el status
      },
    });

    return NextResponse.json(updatedTechService, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar el TechService:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
