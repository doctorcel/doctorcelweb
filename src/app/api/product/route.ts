// app/api/product/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, categoryId, warehouseId, brand, frontCamera, screenSize, batteryCapacity, financialEntity, offerPrice } = body;

    // Crear producto temporal (sin alterar la base de datos)
    const newProduct = await prisma.article.create({
      data: {
        name,
        description,
        price,
        categoryId,
        warehouseId,
        brand,
        frontCamera,
        screenSize,
        batteryCapacity,
        financialEntity,
        offerPrice,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}
