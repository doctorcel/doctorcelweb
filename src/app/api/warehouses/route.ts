// app/api/warehouses/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Warehouse } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Asegúrate de que la ruta es correcta

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Log para depuración
  console.log("GET /api/warehouses - Session:", session);

  if (!session) {
    return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
  }

  try {
    const warehouses: Warehouse[] = await prisma.warehouse.findMany();
    return NextResponse.json(warehouses, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las bodegas:", error);
    return NextResponse.json({ error: "Error al obtener las bodegas" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Log para depuración
  console.log("POST /api/warehouses - Session:", session);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
  }

  const { name, description }: Partial<Warehouse> = await request.json();

  if (!name) {
    return NextResponse.json(
      { error: "El nombre de la bodega es obligatorio" },
      { status: 400 }
    );
  }

  try {
    const warehouse = await prisma.warehouse.create({
      data: { name, description },
    });
    return NextResponse.json(warehouse, { status: 201 });
  } catch (error) {
    console.error("Error al crear la bodega:", error);
    return NextResponse.json(
      { error: "Error al crear la bodega" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Log para depuración
  console.log("PATCH /api/warehouses - Session:", session);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  if (!idParam) {
    return NextResponse.json(
      { error: "ID de bodega no proporcionado" },
      { status: 400 }
    );
  }

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: "ID de bodega inválido" },
      { status: 400 }
    );
  }

  const { name, description }: Partial<Warehouse> = await request.json();

  try {
    const warehouse = await prisma.warehouse.update({
      where: { id },
      data: { name, description },
    });
    return NextResponse.json(warehouse, { status: 200 });
  } catch (error) {
    console.error("Error al actualizar la bodega:", error);
    return NextResponse.json(
      { error: "Error al actualizar la bodega" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  // Log para depuración
  console.log("DELETE /api/warehouses - Session:", session);

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");

  if (!idParam) {
    return NextResponse.json(
      { error: "ID de bodega no proporcionado" },
      { status: 400 }
    );
  }

  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: "ID de bodega inválido" },
      { status: 400 }
    );
  }

  try {
    await prisma.warehouse.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Bodega eliminada correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar la bodega:", error);
    return NextResponse.json(
      { error: "Error al eliminar la bodega" },
      { status: 500 }
    );
  }
}
