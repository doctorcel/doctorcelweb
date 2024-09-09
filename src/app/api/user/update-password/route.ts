import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json()

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar la contraseña del usuario
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
      select: { id: true, email: true }
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    console.log('Password updated successfully for user:', email);
    console.log('New hashed password:', hashedPassword);

    return NextResponse.json({ message: 'Password updated successfully', user: updatedUser })
  } catch (error) {
    console.error('Password update error:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: `Error updating password: ${error.message}` }, { status: 500 })
    }
    return NextResponse.json({ message: 'Unknown error updating password' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}