// app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validar que el ID sea un número
  const categoryId = parseInt(id, 10);
  if (isNaN(categoryId)) {
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
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { subcategories: true },
    });

    if (!category) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validar que el ID sea un número
  const categoryId = parseInt(id, 10);
  if (isNaN(categoryId)) {
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
    const { name, active } = await req.json();

    // Validar que al menos un campo esté presente
    if (!name && active === undefined) {
      return NextResponse.json(
        { error: "Al menos un campo (name, active) es requerido" },
        { status: 400 }
      );
    }

    const data: any = {};
    if (name) data.name = name;
    if (active) data.active = active;

    // Actualizar la categoría
    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data,
    });

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error: any) {
    console.error("Error al actualizar la categoría:", error);
    if (error.code === "P2025") {
      // Registro no encontrado
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
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
  const categoryId = parseInt(id, 10);
  if (isNaN(categoryId)) {
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
    // Verificar si la categoría tiene subcategorías asociadas
    const subcategories = await prisma.subcategory.findMany({
      where: { categoryId: categoryId },
    });

    if (subcategories.length > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar una categoría con subcategorías" },
        { status: 400 }
      );
    }

    // Verificar si la categoría tiene artículos asociados
    const articles = await prisma.article.findMany({
      where: { categoryId: categoryId },
    });

    if (articles.length > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar una categoría con artículos asociados" },
        { status: 400 }
      );
    }

    // Eliminar la categoría
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json(
      { message: "Categoría eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error al eliminar la categoría:", error);
    if (error.code === "P2025") {
      // Registro no encontrado
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
