import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const articles = await prisma.article.findMany()
    return NextResponse.json(articles)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching articles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newArticle = await prisma.article.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        categoryId: body.categoryId,
        ...(body.camera !== undefined ? { camera: body.camera } : {}),
        ...(body.ram !== undefined ? { ram: body.ram } : {}),
        ...(body.storage !== undefined ? { storage: body.storage } : {}),
        ...(body.processor !== undefined ? { processor: body.processor } : {}),
        ...(body.imageUrl1 !== undefined ? { imageUrl1: body.imageUrl1 } : {}),
        ...(body.imageUrl2 !== undefined ? { imageUrl2: body.imageUrl2 } : {}),
        ...(body.imageUrl3 !== undefined ? { imageUrl3: body.imageUrl3 } : {}),
        ...(body.imageUrl4 !== undefined ? { imageUrl4: body.imageUrl4 } : {}),
        ...(body.price4Months !== undefined ? { price4Months: body.price4Months } : {}),
        ...(body.price8Months !== undefined ? { price8Months: body.price8Months } : {}),
        ...(body.price12Months !== undefined ? { price12Months: body.price12Months } : {}),
        ...(body.price16Months !== undefined ? { price16Months: body.price16Months } : {}),
      }
    })
    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Error creating article' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    const updateData = await request.json();
    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.name !== undefined ? { name: updateData.name } : {}),
        ...(updateData.description !== undefined ? { description: updateData.description } : {}),
        ...(updateData.price !== undefined ? { price: Number(updateData.price) } : {}),
        ...(updateData.categoryId !== undefined ? { categoryId: Number(updateData.categoryId) } : {}),
        ...(updateData.camera !== undefined ? { camera: updateData.camera } : {}),
        ...(updateData.ram !== undefined ? { ram: updateData.ram } : {}),
        ...(updateData.storage !== undefined ? { storage: updateData.storage } : {}),
        ...(updateData.processor !== undefined ? { processor: updateData.processor } : {}),
        ...(updateData.imageUrl1 !== undefined ? { imageUrl1: updateData.imageUrl1 } : {}),
        ...(updateData.imageUrl2 !== undefined ? { imageUrl2: updateData.imageUrl2 } : {}),
        ...(updateData.imageUrl3 !== undefined ? { imageUrl3: updateData.imageUrl3 } : {}),
        ...(updateData.imageUrl4 !== undefined ? { imageUrl4: updateData.imageUrl4 } : {}),
        ...(updateData.price4Months !== undefined ? { price4Months: Number(updateData.price4Months) } : {}),
        ...(updateData.price8Months !== undefined ? { price8Months: Number(updateData.price8Months) } : {}),
        ...(updateData.price12Months !== undefined ? { price12Months: Number(updateData.price12Months) } : {}),
        ...(updateData.price16Months !== undefined ? { price16Months: Number(updateData.price16Months) } : {}),
      },
    })
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Error updating article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.article.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Error deleting article' }, { status: 500 })
  }
}