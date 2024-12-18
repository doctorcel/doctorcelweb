// src/prisma/client.ts

import { PrismaClient } from '@prisma/client';

declare global {
  // Previene la creación de múltiples instancias de Prisma Client en desarrollo
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

async function verifyStoredPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true }
  })

  if (user) {
    console.log('Contraseña almacenada:', user.password)
    console.log('Longitud de la contraseña:', user.password.length)
  } else {
    console.log('Usuario no encontrado')
  }
}

verifyStoredPassword('carvajaljuliana@gmail.com')
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
export default prisma;