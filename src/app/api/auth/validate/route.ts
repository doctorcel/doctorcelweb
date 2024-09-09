import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

/**
 * @swagger
 * /api/auth/validate:
 *   get:
 *     summary: Validate a user's token
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: Invalid or missing token
 *       404:
 *         description: User not found
 */

const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader) {
      console.log('No Authorization header provided')
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      console.log('Invalid token format in Authorization header')
      return NextResponse.json({ message: 'Invalid token format' }, { status: 401 })
    }

    console.log('Validating token')

    const decoded = jwt.verify(token, SECRET_KEY) as { id: number, email: string, role: string }
    console.log('Token decoded:', decoded)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user) {
      console.log('User not found for id:', decoded.id)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    console.log('Token validated successfully for user:', user.email)

    return NextResponse.json(user)
  } catch (error) {
    console.error('Token validation error:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}