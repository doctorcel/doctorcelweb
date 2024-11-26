import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
        companyInfo: true,
        warehouse: true,
        items: true,
      },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json({ error: 'Error fetching invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      clientId,
      companyInfoId,
      warehouseId,
      clientName,
      clientAddress,
      clientPhone,
      clientEmail,
      clientTaxId,
      items,
    } = body;

    // Si no hay cliente, asignar "Consumidor Final"
    const client = clientId
      ? { connect: { id: clientId } }
      : {
          create: {
            name: 'Consumidor Final',
            email: 'consumidorfinal@example.com',
            phone: '0000000000',
            address: 'N/A',
            taxId: 'N/A',
          },
        };

    // Calcular el total de la factura sumando los subtotales de los productos
    const total = items.reduce((acc: number, item: any) => {
      return acc + (item.quantity * item.price - (item.discount || 0));
    }, 0);

    // Obtener el nombre del cliente si se proporciona un clientId
    let actualClientName = 'Consumidor Final'; // Valor por defecto
    if (clientId) {
      const foundClient = await prisma.client.findUnique({
        where: { id: parseInt(clientId) },
      });

      // Verificamos si el cliente existe y obtenemos el nombre
      if (foundClient) {
        actualClientName = foundClient.name || 'Consumidor Final';
      }
    }

    // Crear la factura
    const newInvoice = await prisma.invoice.create({
      data: {
        total, // Total calculado
        client: client,
        clientName: actualClientName,
        clientAddress: clientAddress || 'N/A',
        clientPhone: clientPhone || 'N/A',
        clientEmail: clientEmail || 'N/A',
        clientTaxId: clientTaxId || 'N/A',
        companyInfo: {
          connect: { id: parseInt(companyInfoId) }
        },
        warehouse: {
          connect: { id: parseInt(warehouseId) }
        },
        items: {
          create: items.map((item: any) => ({
            articleId: parseInt(item.articleId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            subtotal: parseFloat(item.subtotal),
            discount: item.discount ? parseFloat(item.discount) : 0,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating invoice' }, { status: 500 });
  }
}


export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }
    const updateData = await request.json();
    
    const updatedInvoice = await prisma.invoice.update({
      where: { id: parseInt(id) },
      data: {
        total: updateData.total ? parseFloat(updateData.total) : undefined,
        clientId: updateData.clientId ? parseInt(updateData.clientId) : undefined,
        companyInfoId: updateData.companyInfoId ? parseInt(updateData.companyInfoId) : undefined,
        warehouseId: updateData.warehouseId ? parseInt(updateData.warehouseId) : undefined,
        clientName: updateData.clientName,
        clientAddress: updateData.clientAddress,
        clientPhone: updateData.clientPhone,
        clientEmail: updateData.clientEmail,
        clientTaxId: updateData.clientTaxId,
        items: updateData.items
          ? {
              deleteMany: {},
              create: updateData.items.map((item: any) => ({
                articleId: parseInt(item.articleId),
                quantity: parseInt(item.quantity),
                price: parseFloat(item.price),
                subtotal: parseFloat(item.subtotal),
                discount: item.discount ? parseFloat(item.discount) : 0,
              })),
            }
          : undefined,
      },
      include: { items: true },
    });

    return NextResponse.json(updatedInvoice);
  } catch (error) {
    console.error('Error updating invoice:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error updating invoice' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 });
    }
    await prisma.invoice.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error deleting invoice' }, { status: 500 });
  }
}
