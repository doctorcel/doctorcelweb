// app/api/subcategories/route.ts

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
    const { searchParams } = new URL(req.url);
    const categoryIdParam = searchParams.get("categoryId");

    let subcategories;

    if (categoryIdParam) {
      const categoryId = parseInt(categoryIdParam, 10);
      if (isNaN(categoryId)) {
        return NextResponse.json({ error: "categoryId inválido" }, { status: 400 });
      }

      // Verificar si la categoría existe
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!categoryExists) {
        return NextResponse.json(
          { error: "Categoría no encontrada" },
          { status: 404 }
        );
      }

      // Obtener subcategorías filtradas por categoryId
      subcategories = await prisma.subcategory.findMany({
        where: { categoryId: categoryId },
        select: { id: true, name: true }, // Seleccionar solo los campos necesarios
      });
    } else {
      // Si no se proporciona categoryId, devolver todas las subcategorías
      subcategories = await prisma.subcategory.findMany({
        select: { id: true, name: true },
      });
    }

    return NextResponse.json(subcategories, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las subcategorías:", error);
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
    const { name, categoryId, active } = await req.json();

    // Validar que el nombre y categoryId estén presentes
    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Nombre y categoryId son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si la subcategoría ya existe en la misma categoría
    const existingSubcategory = await prisma.subcategory.findFirst({
      where: {
        name: name,
        categoryId: parseInt(categoryId, 10),
      },
    });

    if (existingSubcategory) {
      return NextResponse.json(
        { error: "La subcategoría ya existe en esta categoría" },
        { status: 409 }
      );
    }

    // Verificar si la categoría existe
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId, 10) },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 }
      );
    }

    // Crear la nueva subcategoría
    const subcategory = await prisma.subcategory.create({
      data: {
        name,
        categoryId: parseInt(categoryId, 10),
        active: active || "ENABLED",
      },
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    console.error("Error al crear la subcategoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}