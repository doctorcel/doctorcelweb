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
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const { id, ...updateData } = await request.json();
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: { id: true, name: true, email: true, role: true }
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const middlewareResponse = await applyMiddleware(request);
  if (middlewareResponse) return middlewareResponse;

  try {
    const { id } = await request.json();
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
