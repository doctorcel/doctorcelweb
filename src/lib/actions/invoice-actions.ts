'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'; // Asegúrate de tener esta configuración en tu proyecto

// Zod schema para validación (igual que en el formulario)
const InvoiceItemSchema = z.object({
  articleId: z.number({ required_error: 'Article is required' }),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price must be non-negative'),
  discount: z.number().optional(),
});

const InvoiceSchema = z.object({
  clientId: z.number({ required_error: 'Client is required' }),
  companyInfoId: z.number().optional().default(1),
  clientName: z.string(),
  clientAddress: z.string().optional(),
  clientPhone: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientTaxId: z.string().optional(),
  warehouseId: z.number().optional().default(1),
  items: z.array(InvoiceItemSchema).min(1, 'At least one item is required'),
  total: z.number().min(0, 'Total must be non-negative'),
});

export async function createInvoice(data: z.infer<typeof InvoiceSchema>) {
  // Validar los datos de entrada
  const validatedData = InvoiceSchema.parse(data);

  try {
    // Iniciar una transacción de base de datos
    const invoice = await prisma.$transaction(async (prisma) => {
      // Crear la factura
      const createdInvoice = await prisma.invoice.create({
        data: {
          clientId: validatedData.clientId,
          companyInfoId: validatedData.companyInfoId,
          clientName: validatedData.clientName,
          clientAddress: validatedData.clientAddress,
          clientPhone: validatedData.clientPhone,
          clientEmail: validatedData.clientEmail,
          clientTaxId: validatedData.clientTaxId,
          warehouseId: validatedData.warehouseId,
          total: validatedData.total,
          items: {
            create: validatedData.items.map(item => ({
              articleId: item.articleId,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount,
              subtotal: item.quantity * item.price - (item.discount || 0), // Calcula el subtotal aquí
              article: { connect: { id: item.articleId } }, // Conectar el artículo
            })),
          },
        },
        include: {
          items: true,  // Asegúrate de que esto sea correcto según tu esquema
        },
      });

      return createdInvoice;
    });

    // Redirigir o devolver una respuesta de éxito opcionalmente
    redirect(`/invoices/${invoice.id}`);
  } catch (error) {
    // Manejar cualquier error (validación, base de datos, etc.)
    console.error('Failed to create invoice:', error);
    
    // Podrías lanzar un error más específico o devolver una respuesta de error
    throw new Error('Failed to create invoice');
  }
}

// Función opcional para obtener clientes y artículos para el formulario
export async function getInvoiceFormData() {
  const clients = await prisma.client.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const articles = await prisma.article.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return { clients, articles };
}
