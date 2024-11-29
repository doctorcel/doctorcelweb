import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const invoiceItems = await prisma.invoiceItem.findMany()
    return NextResponse.json(invoiceItems)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching invoice items' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { invoiceId, articleId, quantity, price, subtotal, discount } = await request.json()
    const newInvoiceItem = await prisma.invoiceItem.create({
      data: { 
        invoiceId: Number(invoiceId),
        articleId: Number(articleId),
        name: String(articleId),
        quantity: Number(quantity),
        price: Number(price),
        subtotal: Number(subtotal),
        discount: discount ? Number(discount) : 0
      }
    })
    return NextResponse.json(newInvoiceItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating invoice item' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedInvoiceItem = await prisma.invoiceItem.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.invoiceId && { invoiceId: Number(updateData.invoiceId) }),
        ...(updateData.articleId && { articleId: Number(updateData.articleId) }),
        ...(updateData.quantity && { quantity: Number(updateData.quantity) }),
        ...(updateData.price && { price: Number(updateData.price) }),
        ...(updateData.subtotal && { subtotal: Number(updateData.subtotal) }),
        ...(updateData.discount && { discount: Number(updateData.discount) }),
      },
    })
    return NextResponse.json(updatedInvoiceItem)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating invoice item' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.invoiceItem.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Invoice item deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting invoice item' }, { status: 500 })
  }
}