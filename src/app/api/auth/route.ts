import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/**
 * @swagger
 * /api/auth/:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */

const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: Request) {
  try {
    console.log('Auth endpoint reached');
    const { email, password } = await request.json()
    console.log('Login attempt for email:', email)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      console.log('User not found for email:', email)
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    console.log('User found:', user.email)

    console.log('Comparing passwords')
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    console.log('Login successful for user:', email)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof Error) {
      return NextResponse.json({ message: `Internal server error: ${error.message}` }, { status: 500 })
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}