// src/app/api/auth/register/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getToken } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    // Validaciones básicas
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Verificar si existe un usuario administrador
    const adminExists = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    let userRole = role;

    if (!adminExists) {
      // Asignar rol ADMIN al primer usuario
      userRole = 'ADMIN';
    } else {
      // Solo los administradores pueden crear nuevos usuarios con roles específicos
      if (!role) {
        return NextResponse.json(
          { message: 'Role is required' },
          { status: 400 }
        );
      }

      // Obtener el token de la sesión actual
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

      if (!token || token.role !== 'ADMIN') {
        return NextResponse.json(
          { message: 'Only admins can create new users' },
          { status: 403 }
        );
      }

      // Validar el rol proporcionado
      if (!['ADMIN', 'SELLER', 'TECHNICIAN'].includes(role)) {
        return NextResponse.json(
          { message: 'Invalid role' },
          { status: 400 }
        );
      }
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole || 'SELLER', // Rol por defecto si no se proporciona
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
