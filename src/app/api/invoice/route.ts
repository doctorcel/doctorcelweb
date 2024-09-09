import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany()
    return NextResponse.json(invoices)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching invoices' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { number, total, clientId, companyInfoId, clientName, clientAddress, clientPhone, clientEmail, clientTaxId } = await request.json()
    const newInvoice = await prisma.invoice.create({
      data: { 
        number,
        total: Number(total),
        clientId: Number(clientId),
        companyInfoId: Number(companyInfoId),
        clientName,
        clientAddress,
        clientPhone,
        clientEmail,
        clientTaxId
      }
    })
    return NextResponse.json(newInvoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating invoice' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedInvoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        ...(updateData.number && { number: updateData.number }),
        ...(updateData.total && { total: Number(updateData.total) }),
        ...(updateData.clientId && { clientId: Number(updateData.clientId) }),
        ...(updateData.companyInfoId && { companyInfoId: Number(updateData.companyInfoId) }),
        ...(updateData.clientName && { clientName: updateData.clientName }),
        ...(updateData.clientAddress && { clientAddress: updateData.clientAddress }),
        ...(updateData.clientPhone && { clientPhone: updateData.clientPhone }),
        ...(updateData.clientEmail && { clientEmail: updateData.clientEmail }),
        ...(updateData.clientTaxId && { clientTaxId: updateData.clientTaxId }),
      },
    })
    return NextResponse.json(updatedInvoice)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating invoice' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.invoice.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Invoice deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting invoice' }, { status: 500 })
  }
}