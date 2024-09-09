import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const invoiceItems = await prisma.invoiceItem.findMany()
        res.status(200).json(invoiceItems)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching invoice items' })
      }
      break

    case 'POST':
      try {
        const { invoiceId, articleId, quantity, price, subtotal } = req.body
        const newInvoiceItem = await prisma.invoiceItem.create({
          data: { 
            invoiceId: Number(invoiceId),
            articleId: Number(articleId),
            quantity: Number(quantity),
            price: Number(price),
            subtotal: Number(subtotal)
          }
        })
        res.status(201).json(newInvoiceItem)
      } catch (error) {
        res.status(500).json({ error: 'Error creating invoice item' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
        const updatedInvoiceItem = await prisma.invoiceItem.update({
          where: { id: Number(id) },
          data: {
            ...(updateData.invoiceId && { invoiceId: Number(updateData.invoiceId) }),
            ...(updateData.articleId && { articleId: Number(updateData.articleId) }),
            ...(updateData.quantity && { quantity: Number(updateData.quantity) }),
            ...(updateData.price && { price: Number(updateData.price) }),
            ...(updateData.subtotal && { subtotal: Number(updateData.subtotal) }),
          },
        })
        res.status(200).json(updatedInvoiceItem)
      } catch (error) {
        res.status(500).json({ error: 'Error updating invoice item' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.invoiceItem.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Invoice item deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting invoice item' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}