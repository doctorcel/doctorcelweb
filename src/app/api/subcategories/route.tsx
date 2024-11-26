import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: { category: true }
    });
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json({ error: 'Error fetching subcategories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newSubcategory = await prisma.subcategory.create({
      data: { 
        name: body.name,
        categoryId: parseInt(body.categoryId)
      },
      include: { category: true }
    });
    return NextResponse.json(newSubcategory, { status: 201 });
  } catch (error) {
    console.error('Error creating subcategory:', error);   if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating subcategory' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Subcategory ID is required' }, { status: 400 });
    }
    const updateData = await request.json();
    const updatedSubcategory = await prisma.subcategory.update({
      where: { id: parseInt(id) },
      data: {
        name: updateData.name,
        categoryId: updateData.categoryId ? parseInt(updateData.categoryId) : undefined
      },
      include: { category: true }
    });
    return NextResponse.json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error updating subcategory' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Subcategory ID is required' }, { status: 400 });
    }
    await prisma.subcategory.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error deleting subcategory' }, { status: 500 });
  }
}