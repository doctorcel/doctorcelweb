import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const companyInfo = await prisma.companyInfo.findMany()
    return NextResponse.json(companyInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching company info' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, address, phone, email, taxId, logoUrl, documentType, documentNumber, regime, city, department, country, website } = await request.json()
    const newCompanyInfo = await prisma.companyInfo.create({
      data: { 
        name,
        address,
        phone,
        email,
        taxId,
        logoUrl,
        documentType,
        documentNumber,
        regime,
        city,
        department,
        country,
        website
      }
    })
    return NextResponse.json(newCompanyInfo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating company info' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updateData } = await request.json()
    const updatedCompanyInfo = await prisma.companyInfo.update({
      where: { id: Number(id) },
      data: updateData,
    })
    return NextResponse.json(updatedCompanyInfo)
  } catch (error) {
    return NextResponse.json({ error: 'Error updating company info' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.companyInfo.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({ message: 'Company info deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting company info' }, { status: 500 })
  }
}