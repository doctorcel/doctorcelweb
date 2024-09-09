// src/app/api/swagger/route.ts

import { NextResponse } from 'next/server';
import swaggerJSDoc from 'swagger-jsdoc';

export async function GET() {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Next.js Swagger API',
      version: '1.0.0',
    },
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/app/api/**/*.ts'], // Ruta ajustada para encontrar tus rutas documentadas
  };

  const swaggerSpec = swaggerJSDoc(options);

  return NextResponse.json(swaggerSpec);
}
