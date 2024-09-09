import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const orders = await prisma.order.findMany()
        res.status(200).json(orders)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' })
      }
      break

    case 'POST':
      try {
        const { total, status, clientId } = req.body
        const newOrder = await prisma.order.create({
          data: { 
            total: Number(total), 
            status: String(status), 
            clientId: Number(clientId)
          }
        })
        res.status(201).json(newOrder)
      } catch (error) {
        res.status(500).json({ error: 'Error creating order' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
        const updatedOrder = await prisma.order.update({
          where: { id: Number(id) },
          data: {
            ...(updateData.total && { total: Number(updateData.total) }),
            ...(updateData.status && { status: updateData.status }),
            ...(updateData.clientId && { clientId: Number(updateData.clientId) }),
          },
        })
        res.status(200).json(updatedOrder)
      } catch (error) {
        res.status(500).json({ error: 'Error updating order' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.order.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Order deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting order' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}