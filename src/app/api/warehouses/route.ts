import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Warehouse } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET;

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

function verifyToken(token: string): JwtPayload | null {
  try {
    if (!SECRET_KEY) {
      console.error('JWT_SECRET is not defined');
      return null;
    }
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

async function validateAdmin(request: NextRequest): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);

  return payload?.role === 'ADMIN';
}

export async function GET(request: NextRequest) {
  if (!await validateAdmin(request)) {
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
  }

  try {
    const warehouses: Warehouse[] = await prisma.warehouse.findMany();
    return NextResponse.json(warehouses);
  } catch (error) {
    console.error('Error al obtener las bodegas:', error);
    return NextResponse.json({ error: 'Error al obtener las bodegas' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!await validateAdmin(request)) {
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
  }

  const { name, description }: Partial<Warehouse> = await request.json();
  try {
    const warehouse = await prisma.warehouse.create({
      data: { name: name!, description },
    });
    return NextResponse.json(warehouse, { status: 201 });
  } catch (error) {
    console.error('Error al crear la bodega:', error);
    return NextResponse.json({ error: 'Error al crear la bodega' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!await validateAdmin(request)) {
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID de bodega no proporcionado' }, { status: 400 });
  }

  const { name, description }: Partial<Warehouse> = await request.json();
  try {
    const warehouse = await prisma.warehouse.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error('Error al actualizar la bodega:', error);
    return NextResponse.json({ error: 'Error al actualizar la bodega' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await validateAdmin(request)) {
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID de bodega no proporcionado' }, { status: 400 });
  }

  try {
    await prisma.warehouse.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Bodega eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la bodega:', error);
    return NextResponse.json({ error: 'Error al eliminar la bodega' }, { status: 500 });
  }
}