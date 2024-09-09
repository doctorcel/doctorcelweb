const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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