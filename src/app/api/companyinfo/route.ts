import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const companyInfo = await prisma.companyInfo.findMany()
        res.status(200).json(companyInfo)
      } catch (error) {
        res.status(500).json({ error: 'Error fetching company info' })
      }
      break

    case 'POST':
      try {
        const { name, address, phone, email, taxId } = req.body
        const newCompanyInfo = await prisma.companyInfo.create({
          data: { 
            name,
            address,
            phone,
            email,
            taxId
          }
        })
        res.status(201).json(newCompanyInfo)
      } catch (error) {
        res.status(500).json({ error: 'Error creating company info' })
      }
      break

    case 'PATCH':
      try {
        const { id, ...updateData } = req.body
        const updatedCompanyInfo = await prisma.companyInfo.update({
          where: { id: Number(id) },
          data: updateData,
        })
        res.status(200).json(updatedCompanyInfo)
      } catch (error) {
        res.status(500).json({ error: 'Error updating company info' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        await prisma.companyInfo.delete({
          where: { id: Number(id) },
        })
        res.status(200).json({ message: 'Company info deleted successfully' })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting company info' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}