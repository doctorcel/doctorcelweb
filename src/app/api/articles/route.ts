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
        ...(body.camara !== undefined ? { camara: body.camara } : {}),
        ...(body.camera !== undefined ? { camera: body.camera } : {}),
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
    const { id, ...updateData } = await request.json()
    const updatedArticle = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.description && { description: updateData.description }),
        ...(updateData.price && { price: Number(updateData.price) }),
        ...(updateData.categoryId && { categoryId: Number(updateData.categoryId) }),
        ...(updateData.camara !== undefined ? { camara: updateData.camara } : {}),
        ...(updateData.camera !== undefined ? { camera: updateData.camera } : {}),
        ...(updateData.ram && { ram: updateData.ram }),
        ...(updateData.storage && { storage: updateData.storage }),
        ...(updateData.processor && { processor: updateData.processor }),
        ...(updateData.imageUrl1 && { imageUrl1: updateData.imageUrl1 }),
        ...(updateData.imageUrl2 && { imageUrl2: updateData.imageUrl2 }),
        ...(updateData.imageUrl3 && { imageUrl3: updateData.imageUrl3 }),
        ...(updateData.imageUrl4 && { imageUrl4: updateData.imageUrl4 }),
        ...(updateData.price4Months && { price4Months: Number(updateData.price4Months) }),
        ...(updateData.price8Months && { price8Months: Number(updateData.price8Months) }),
        ...(updateData.price12Months && { price12Months: Number(updateData.price12Months) }),
        ...(updateData.price16Months && { price16Months: Number(updateData.price16Months) }),
      },
    })
    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Error updating article' }, { status: 500 })
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