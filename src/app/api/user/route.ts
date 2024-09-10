// app/api/user/route.ts
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

export async function GET(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const { name, email, password, role } = await request.json();
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

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error instanceof Error && error.message.includes('Unique constraint failed on the fields: (`email`)')) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const { id, name, email, password, role } = await request.json();
    const updateData: any = { name, email, role };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: { id: true, name: true, email: true, role: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const { id } = await request.json();
    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}