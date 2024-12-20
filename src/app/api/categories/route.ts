// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  // Obtener la sesión del usuario
  const session = await getServerSession(authOptions);

  // Verificar si el usuario está autenticado
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Verificar si el usuario tiene rol ADMIN
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  try {
    const categories = await prisma.category.findMany({
      where: { active: "ENABLED" },
      include: { subcategories: true },
    });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  // Obtener la sesión del usuario
  const session = await getServerSession(authOptions);

  // Verificar si el usuario está autenticado
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Verificar si el usuario tiene rol ADMIN
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  try {
    const { name, active } = await req.json();

    // Validar que el nombre esté presente
    if (!name) {
      return NextResponse.json(
        { error: "El nombre es requerido" },
        { status: 400 }
      );
    }

    // Crear la nueva categoría
    const category = await prisma.category.create({
      data: { name, active: active || "ENABLED" },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
