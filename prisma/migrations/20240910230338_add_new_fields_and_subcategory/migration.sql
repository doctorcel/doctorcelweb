/*
  Warnings:

  - You are about to drop the column `price12Months` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `price16Months` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `price4Months` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `price8Months` on the `Article` table. All the data in the column will be lost.
  - The `number` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[number]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "price12Months",
DROP COLUMN "price16Months",
DROP COLUMN "price4Months",
DROP COLUMN "price8Months",
ADD COLUMN     "Initial" DOUBLE PRECISION,
ADD COLUMN     "batteryCapacity" TEXT,
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "financialEntity" TEXT,
ADD COLUMN     "frontCamera" TEXT,
ADD COLUMN     "offerPrice" DOUBLE PRECISION,
ADD COLUMN     "price12" DOUBLE PRECISION,
ADD COLUMN     "price16" DOUBLE PRECISION,
ADD COLUMN     "price8" DOUBLE PRECISION,
ADD COLUMN     "screenSize" TEXT;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "document" TEXT,
ADD COLUMN     "documentType" TEXT,
ADD COLUMN     "personType" TEXT,
ADD COLUMN     "regime" TEXT;

-- AlterTable
ALTER TABLE "CompanyInfo" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "regime" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "number",
ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceItem" ADD COLUMN     "discount" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "TechService" ADD COLUMN     "brand" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "password" TEXT;

-- CreateTable
CREATE TABLE "Subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_number_key" ON "Invoice"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
