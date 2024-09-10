import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: { client: true, companyInfo: true, warehouse: true, items: true }
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
    const newInvoice = await prisma.invoice.create({
      data: { 
        number: body.number,
        total: parseFloat(body.total),
        clientId: parseInt(body.clientId),
        companyInfoId: parseInt(body.companyInfoId),
        warehouseId: parseInt(body.warehouseId), // Nuevo campo requerido
        clientName: body.clientName,
        clientAddress: body.clientAddress,
        clientPhone: body.clientPhone,
        clientEmail: body.clientEmail,
        clientTaxId: body.clientTaxId,
        items: {
          create: body.items.map((item: any) => ({
            articleId: parseInt(item.articleId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            subtotal: parseFloat(item.subtotal)
          }))
        }
      },
      include: { items: true }
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
        number: updateData.number,
        total: updateData.total ? parseFloat(updateData.total) : undefined,
        clientId: updateData.clientId ? parseInt(updateData.clientId) : undefined,
        companyInfoId: updateData.companyInfoId ? parseInt(updateData.companyInfoId) : undefined,
        warehouseId: updateData.warehouseId ? parseInt(updateData.warehouseId) : undefined,
        clientName: updateData.clientName,
        clientAddress: updateData.clientAddress,
        clientPhone: updateData.clientPhone,
        clientEmail: updateData.clientEmail,
        clientTaxId: updateData.clientTaxId,
        items: updateData.items ? {
          deleteMany: {},
          create: updateData.items.map((item: any) => ({
            articleId: parseInt(item.articleId),
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            subtotal: parseFloat(item.subtotal)
          }))
        } : undefined
      },
      include: { items: true }
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