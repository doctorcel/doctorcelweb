import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const techServices = await prisma.techService.findMany()
    return NextResponse.json(techServices)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tech services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { description, status, clientId, deviceType, serialNumber, technicianId } = await request.json()
    const newTechService = await prisma.techService.create({
      data: { 
        description,
        status,
        clientId: Number(clientId),
        deviceType,
        serialNumber,
        technicianId: Number(technicianId)
      }
    })
    return NextResponse.json(newTechService, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating tech service' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedTechService = await prisma.techService.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.description && { description: updateData.description }),
        ...(updateData.status && { status: updateData.status }),
        ...(updateData.clientId && { clientId: Number(updateData.clientId) }),
        ...(updateData.deviceType && { deviceType: updateData.deviceType }),
        ...(updateData.serialNumber && { serialNumber: updateData.serialNumber }),
        ...(updateData.technicianId && { technicianId: Number(updateData.technicianId) }),
      },
    })
    return NextResponse.json(updatedTechService)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating tech service' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.techService.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Tech service deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting tech service' }, { status: 500 })
  }
}