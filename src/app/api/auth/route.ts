import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

const SECRET_KEY = process.env.JWT_SECRET

export async function POST(request: NextRequest) {
  console.log('Auth endpoint reached');
  console.log('Environment variables:', {
    DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Not set',
  });

  try {
    if (!SECRET_KEY) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    const { email, password } = await request.json()
    console.log('Login attempt for email:', email);

    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User found:', user ? 'Yes' : 'No');

    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1h' }
    )

    console.log('Login successful for user:', email);

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
    console.error('Login error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: `Server error: ${error.message}` }, { status: 500 })
    }
    return NextResponse.json({ message: 'Unknown server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}