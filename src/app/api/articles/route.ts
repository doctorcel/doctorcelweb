import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Obtener todos los artículos
export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { category: true },
    });
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const article = await prisma.article.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        categoryId: body.categoryId,
        camera: body.camara,
        ram: body.ram,
        storage: body.storage,
        processor: body.processor,
        imageUrl1: body.imageUrl1,
        imageUrl2: body.imageUrl2,
        imageUrl3: body.imageUrl3,
        imageUrl4: body.imageUrl4,
        price4Months: body.price4Months,
        price8Months: body.price8Months,
        price12Months: body.price12Months,
        price16Months: body.price16Months,
      },
    });
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 });
  }
}

// PATCH: Actualizar un artículo existente
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Error updating article' }, { status: 500 });
  }
}

// DELETE: Eliminar un artículo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    await prisma.article.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    return NextResponse.json({ error: 'Error deleting article' }, { status: 500 });
  }
}