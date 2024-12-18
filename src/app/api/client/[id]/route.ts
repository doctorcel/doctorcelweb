// app/api/clients/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(id) },
      include: {
        invoices: true,
        orders: true,
        techServices: true,
      },
    });

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    console.error(`Error fetching client with id ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Params }) {
  const { id } = params;
  try {
    const data = await request.json();

    // Validate that at least one field is provided for update
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No data provided for update' }, { status: 400 });
    }

    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        documentType: data.documentType,
        document: data.document,
        personType: data.personType,
        regime: data.regime,
        country: data.country,
        department: data.department,
        city: data.city,
        active: data.active,
        // Add other fields as necessary
      },
    });

    return NextResponse.json(updatedClient, { status: 200 });
  } catch (error) {
    console.error(`Error updating client with id ${id}:`, error);
    if (error instanceof Error && 'code' in error && error.code === 'P2025') {//+
      // Prisma error code for record not found
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
