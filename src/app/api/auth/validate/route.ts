import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

let prisma: PrismaClient

try {
  prisma = new PrismaClient()
} catch (error) {
  console.error('Failed to create Prisma Client:', error)
}

const SECRET_KEY = process.env.JWT_SECRET

export async function GET(request: Request) {
  console.log('Validate endpoint reached');
  console.log('Environment variables:', {
    DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
  });

  try {
    if (!SECRET_KEY) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    if (!prisma) {
      console.error('Database connection not established');
      return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
    }

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