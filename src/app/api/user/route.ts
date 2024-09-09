import { NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { authMiddleware, AuthenticatedRequest, authorizeRoles } from '../../../../middleware/authMiddleware'

const prisma = new PrismaClient()

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        authorizeRoles(['ADMIN'])(req, res, async () => {
          const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, role: true } })
          res.status(200).json(users)
        })
      } catch (error) {
        res.status(500).json({ error: 'Error fetching users' })
      }
      break

    case 'POST':
      try {
        authorizeRoles(['ADMIN'])(req, res, async () => {
          const { name, email, password, role } = req.body
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = await prisma.user.create({
            data: { 
              name,
              email,
              password: hashedPassword,
              role
            },
            select: { id: true, name: true, email: true, role: true }
          })
          res.status(201).json(newUser)
        })
      } catch (error) {
        res.status(500).json({ error: 'Error creating user' })
      }
      break

    case 'PATCH':
      try {
        authorizeRoles(['ADMIN'])(req, res, async () => {
          const { id, ...updateData } = req.body
          if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10)
          }
          const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: updateData,
            select: { id: true, name: true, email: true, role: true }
          })
          res.status(200).json(updatedUser)
        })
      } catch (error) {
        res.status(500).json({ error: 'Error updating user' })
      }
      break

    case 'DELETE':
      try {
        authorizeRoles(['ADMIN'])(req, res, async () => {
          const { id } = req.body
          await prisma.user.delete({
            where: { id: Number(id) },
          })
          res.status(200).json({ message: 'User deleted successfully' })
        })
      } catch (error) {
        res.status(500).json({ error: 'Error deleting user' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default authMiddleware(handler)