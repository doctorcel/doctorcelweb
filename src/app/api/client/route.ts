import { PrismaClient, Client } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST: Crear un cliente
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: Client = await req.json();  // Obtener los datos del cuerpo de la solicitud

    // Crear un cliente en la base de datos
    const newClient = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        taxId: data.taxId,
        documentType: data.documentType,
        document: data.document,
        personType: data.personType,
        regime: data.regime,
        country: data.country,
        department: data.department,
        city: data.city,
      },
    });

    return new NextResponse(JSON.stringify(newClient), {
      status: 201,
    });
  } catch (error: unknown) {
    // Validación del tipo de error
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Error desconocido' }), {
        status: 500,
      });
    }
  }
}

// GET: Obtener todos los clientes
export async function GET(): Promise<NextResponse> {
  try {
    const clients = await prisma.client.findMany();

    return new NextResponse(JSON.stringify(clients), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Error desconocido' }), {
        status: 500,
      });
    }
  }
}

// PUT: Actualizar un cliente
export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const { id, name, email, phone, address, taxId, documentType, document, personType, regime, country, department, city } = await req.json();

    // Actualizar un cliente por ID
    const updatedClient = await prisma.client.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
        taxId,
        documentType,
        document,
        personType,
        regime,
        country,
        department,
        city,
      },
    });

    return new NextResponse(JSON.stringify(updatedClient), {
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Error desconocido' }), {
        status: 500,
      });
    }
  }
}
