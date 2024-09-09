import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const techServices = await prisma.techService.findMany()
        res.status(200).json(techServices)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching tech services' })
      }
      break

    case 'POST':
      try {
        const { description, status, clientId, deviceType, serialNumber, technicianId } = req.body
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
        res.status(201).json(newTechService)
      } catch (error) {
        res.status(500).json({ error: 'Error creating tech service' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
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
        res.status(200).json(updatedTechService)
      } catch (error) {
        res.status(500).json({ error: 'Error updating tech service' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.techService.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Tech service deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting tech service' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}