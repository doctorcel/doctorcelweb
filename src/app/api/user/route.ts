import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authMiddleware, authorizeRoles } from '../../../../middleware/authMiddleware';

const prisma = new PrismaClient();

async function applyMiddleware(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (authResponse) return authResponse;
  const roleResponse = await authorizeRoles(['ADMIN'])(request);
  if (roleResponse) return roleResponse;
  return null;
}

export async function POST(request: NextRequest) {
  console.log('User registration endpoint reached');

  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) {
    console.log('Middleware check failed:', middlewareResponse.status);
    return middlewareResponse;
  }

  try {
    const { name, email, password, role } = await request.json();
    console.log('Attempting to create user:', { name, email, role });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: { 
        name,
        email,
        password: hashedPassword,
        role
      },
      select: { id: true, name: true, email: true, role: true }
    });

    console.log('User created successfully:', newUser.email);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error) {
      // Check for unique constraint violation
      if (error.message.includes('Unique constraint failed on the fields: (`email`)')) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
      }
      return NextResponse.json({ error: `Error creating user: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error creating user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}