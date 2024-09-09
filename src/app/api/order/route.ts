import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const orders = await prisma.order.findMany()
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching orders' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { total, status, clientId } = await request.json()
    const newOrder = await prisma.order.create({
      data: { 
        total: Number(total), 
        status: String(status), 
        clientId: Number(clientId)
      }
    })
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.total && { total: Number(updateData.total) }),
        ...(updateData.status && { status: updateData.status }),
        ...(updateData.clientId && { clientId: Number(updateData.clientId) }),
      },
    })
    return NextResponse.json(updatedOrder)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating order' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.order.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting order' }, { status: 500 })
  }
}