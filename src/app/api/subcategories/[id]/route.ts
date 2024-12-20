// app/api/subcategories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validar que el ID sea un número
  const subcategoryId = parseInt(id, 10);
  if (isNaN(subcategoryId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

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
    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
      include: { category: true },
    });

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategoría no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(subcategory, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la subcategoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validar que el ID sea un número
  const subcategoryId = parseInt(id, 10);
  if (isNaN(subcategoryId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

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
    const { name, active, categoryId } = await req.json();

    // Validar que al menos un campo esté presente
    if (!name && active === undefined && !categoryId) {
      return NextResponse.json(
        { error: "Al menos un campo (name, active, categoryId) es requerido" },
        { status: 400 }
      );
    }

    const data: any = {};
    if (name) data.name = name;
    if (active) data.active = active;
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId, 10) },
      });
      if (!category) {
        return NextResponse.json(
          { error: "Categoría no encontrada" },
          { status: 404 }
        );
      }
      data.categoryId = parseInt(categoryId, 10);
    }

    // Actualizar la subcategoría
    const updatedSubcategory = await prisma.subcategory.update({
      where: { id: subcategoryId },
      data,
    });

    return NextResponse.json(updatedSubcategory, { status: 200 });
  } catch (error: any) {
    console.error("Error al actualizar la subcategoría:", error);
    if (error.code === "P2025") {
      // Registro no encontrado
      return NextResponse.json(
        { error: "Subcategoría no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validar que el ID sea un número
  const subcategoryId = parseInt(id, 10);
  if (isNaN(subcategoryId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

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
    // Verificar si la subcategoría tiene artículos asociados
    const articles = await prisma.article.findMany({
      where: { categoryId: subcategoryId },
    });

    if (articles.length > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar una subcategoría con artículos asociados" },
        { status: 400 }
      );
    }

    // Eliminar la subcategoría
    await prisma.subcategory.delete({
      where: { id: subcategoryId },
    });

    return NextResponse.json(
      { message: "Subcategoría eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al eliminar la subcategoría:", error);
    if (error.code === "P2025") {
      // Registro no encontrado
      return NextResponse.json(
        { error: "Subcategoría no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
