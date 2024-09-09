import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const clients = await prisma.client.findMany()
        res.status(200).json(clients)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching clients' })
      }
      break

    case 'POST':
      try {
        const { name, email, phone, address, taxId } = req.body
        const newClient = await prisma.client.create({
          data: { 
            name,
            email,
            phone,
            address,
            taxId
          }
        })
        res.status(201).json(newClient)
      } catch (error) {
        res.status(500).json({ error: 'Error creating client' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
        const updatedClient = await prisma.client.update({
          where: { id: Number(id) },
          data: updateData,
        })
        res.status(200).json(updatedClient)
      } catch (error) {
        res.status(500).json({ error: 'Error updating client' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.client.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Client deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting client' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}