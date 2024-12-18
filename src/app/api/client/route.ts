// app/api/clients/route.ts
import { NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { z } from 'zod';

const clientSchema = z.object({
  name: z.string().min(1, 'Nombre es requerido'),
  email: z.string().email().min(1,'Email es requerido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  documentType: z.string().optional(),
  personType: z.string().optional(),
  regime: z.string().optional(),
  country: z.string().optional(),
  department: z.string().optional(),
  city: z.string().optional(),
  document: z.string().min(1, 'Numero de documento es requerido'),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsedData = clientSchema.parse(data);

    const newClient = await prisma.client.create({
      data: parsedData,
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        invoices: true,
        orders: true,
        techServices: true,
      },
    });
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
