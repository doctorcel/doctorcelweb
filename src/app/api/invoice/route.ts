import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma'; // Adjust import path as needed

// Validation Schema
const InvoiceItemSchema = z.object({
  articleId: z.number().int().positive(),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  cost: z.number().optional().default(0),
  subtotal: z.number().positive(),
  discount: z.number().optional()
});

const InvoiceSchema = z.object({
  clientId: z.number().int().positive(),
  companyInfoId: z.number().int().optional(),
  warehouseId: z.number().int().positive(),
  clientName: z.string().min(1),
  clientAddress: z.string().optional(),
  clientPhone: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientTaxId: z.string().optional(),
  total: z.number().positive(),
  items: z.array(InvoiceItemSchema).min(1),
  notes: z.string().optional()
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = InvoiceSchema.parse(body);

    // Validate related entities exist
    const [client, companyInfo, warehouse] = await Promise.all([
      prisma.client.findUnique({ where: { id: validatedData.clientId } }),
      prisma.companyInfo.findUnique({ where: { id: validatedData.companyInfoId } }),
      prisma.warehouse.findUnique({ where: { id: validatedData.warehouseId } })
    ]);

    // Check entity existence
    const errors: string[] = [];
    if (!client) errors.push('Invalid client ID');
    if (!companyInfo) errors.push('Invalid company info ID');
    if (!warehouse) errors.push('Invalid warehouse ID');

    // Validate articles exist and have sufficient stock
    const articleValidations = await Promise.all(
      validatedData.items.map(async (item) => {
        const article = await prisma.article.findUnique({ 
          where: { id: item.articleId } 
        });

        if (!article) return `Article with ID ${item.articleId} not found`;
        
        // Optional: Stock check if you track inventory
        // if (article.serialNumber < item.quantity) 
        //   return `Insufficient stock for article ${item.articleId}`;

        return null;
      })
    );

    const articleErrors = articleValidations.filter(error => error !== null);
    errors.push(...articleErrors);

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: errors 
        }, 
        { status: 400 }
      );
    }

    // Begin transaction to create invoice and update related data
    const invoice = await prisma.$transaction(async (prisma) => {
      // Create invoice
      const createdInvoice = await prisma.invoice.create({
        data: {
          ...validatedData,
          items: {
            create: validatedData.items
          }
        },
        include: { 
          items: true 
        }
      });

      // Optionally update article stock or perform other actions
      for (const item of validatedData.items) {
        await prisma.article.update({
          where: { id: item.articleId },
          data: {
            serialNumber: { increment: item.quantity }
          }
        });
      }

      return createdInvoice;
    });

    return NextResponse.json(invoice, { status: 201 });

  } catch (error) {
    // Handle different types of errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation error', 
          details: error.errors 
        }, 
        { status: 400 }
      );
    }

    console.error('Invoice creation error:', error);
    return NextResponse.json(
      { 
        error: "Error creating invoice", 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}