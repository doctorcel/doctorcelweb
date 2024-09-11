import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      include: { category: true, warehouse: true }
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
    const newArticle = await prisma.article.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        categoryId: parseInt(body.categoryId),
        warehouseId: parseInt(body.warehouseId),
        camera: body.camera,
        ram: body.ram,
        storage: body.storage,
        processor: body.processor,
        imageUrl1: body.imageUrl1,
        imageUrl2: body.imageUrl2,
        imageUrl3: body.imageUrl3,
        imageUrl4: body.imageUrl4,
        price12: body.price12 ? parseFloat(body.price12) : null,
        price16: body.price16 ? parseFloat(body.price16) : null,
        Initial: body.Initial ? parseFloat(body.Initial) : null,
        price8: body.price8 ? parseFloat(body.price8) : null,
        brand: body.brand,
        frontCamera: body.frontCamera,
        screenSize: body.screenSize,
        batteryCapacity: body.batteryCapacity,
        financialEntity: body.financialEntity,
        offerPrice: body.offerPrice ? parseFloat(body.offerPrice) : null,
      }
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Error creating article:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }
    const updateData = await request.json();
    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name,
        description: updateData.description,
        price: updateData.price ? parseFloat(updateData.price) : undefined,
        categoryId: updateData.categoryId ? parseInt(updateData.categoryId) : undefined,
        warehouseId: updateData.warehouseId ? parseInt(updateData.warehouseId) : undefined,
        camera: updateData.camera,
        ram: updateData.ram,
        storage: updateData.storage,
        processor: updateData.processor,
        imageUrl1: updateData.imageUrl1,
        imageUrl2: updateData.imageUrl2,
        imageUrl3: updateData.imageUrl3,
        imageUrl4: updateData.imageUrl4,
        price12: updateData.price12 ? parseFloat(updateData.price12) : null,
        price16: updateData.price16 ? parseFloat(updateData.price16) : null,
        Initial: updateData.Initial ? parseFloat(updateData.Initial) : null,
        price8: updateData.price8 ? parseFloat(updateData.price8) : null,
        brand: updateData.brand,
        frontCamera: updateData.frontCamera,
        screenSize: updateData.screenSize,
        batteryCapacity: updateData.batteryCapacity,
        financialEntity: updateData.financialEntity,
        offerPrice: updateData.offerPrice ? parseFloat(updateData.offerPrice) : null,
      },
    });
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error updating article' }, { status: 500 });
  }
}

// DELETE function remains the same

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting article:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error deleting article' }, { status: 500 });
  }
}