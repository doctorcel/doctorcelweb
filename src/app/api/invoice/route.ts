import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const invoices = await prisma.invoice.findMany()
        res.status(200).json(invoices)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching invoices' })
      }
      break

    case 'POST':
      try {
        const { number, total, clientId, companyInfoId, clientName, clientAddress, clientPhone, clientEmail, clientTaxId } = req.body
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
        res.status(201).json(newInvoice)
      } catch (error) {
        res.status(500).json({ error: 'Error creating invoice' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
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
        res.status(200).json(updatedInvoice)
      } catch (error) {
        res.status(500).json({ error: 'Error updating invoice' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.invoice.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Invoice deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting invoice' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}