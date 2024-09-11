import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const techServices = await prisma.techService.findMany({
      include: { client: true, technician: true, warehouse: true }
    });
    return NextResponse.json(techServices);
  } catch (error) {
    console.error('Error fetching tech services:', error);
    return NextResponse.json({ error: 'Error fetching tech services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newTechService = await prisma.techService.create({
      data: { 
        description: body.description,
        status: body.status,
        clientId: parseInt(body.clientId),
        deviceType: body.deviceType,
        serialNumber: body.serialNumber,
        technicianId: parseInt(body.technicianId),
        warehouseId: parseInt(body.warehouseId),
        deliveryDate: body.deliveryDate ? new Date(body.deliveryDate) : undefined,
        brand: body.brand,
        color: body.color,
        observations: body.observations,
        password: body.password
      },
      include: { client: true, technician: true, warehouse: true }
    });
    return NextResponse.json(newTechService, { status: 201 });
  } catch (error) {
    console.error('Error creating tech service:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating tech service' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Tech Service ID is required' }, { status: 400 });
    }
    const updateData = await request.json();
    const updatedTechService = await prisma.techService.update({
      where: { id: parseInt(id) },
      data: {
        description: updateData.description,
        status: updateData.status,
        clientId: updateData.clientId ? parseInt(updateData.clientId) : undefined,
        deviceType: updateData.deviceType,
        serialNumber: updateData.serialNumber,
        technicianId: updateData.technicianId ? parseInt(updateData.technicianId) : undefined,
        warehouseId: updateData.warehouseId ? parseInt(updateData.warehouseId) : undefined,
        deliveryDate: updateData.deliveryDate ? new Date(updateData.deliveryDate) : undefined,
        brand: updateData.brand,
        color: updateData.color,
        observations: updateData.observations,
        password: updateData.password
      },
      include: { client: true, technician: true, warehouse: true }
    });
    return NextResponse.json(updatedTechService);
  } catch (error) {
    console.error('Error updating tech service:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error updating tech service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Tech Service ID is required' }, { status: 400 });
    }
    await prisma.techService.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Tech service deleted successfully' });
  } catch (error) {
    console.error('Error deleting tech service:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error deleting tech service' }, { status: 500 });
  }
}