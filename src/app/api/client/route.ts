import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const clients = await prisma.client.findMany()
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, address, taxId, documentType, document, personType, regime, country, department, city } = await request.json()
    const newClient = await prisma.client.create({
      data: { 
        name,
        email,
        phone,
        address,
        taxId,
        documentType,
        document,
        personType,
        regime,
        country,
        department,
        city
      }
    })
    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating client' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedClient = await prisma.client.update({
      where: { id: Number(id) },
      data: updateData,
    })
    return NextResponse.json(updatedClient)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating client' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.client.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Client deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting client' }, { status: 500 })
  }
}