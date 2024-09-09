/*
  Warnings:

  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `TechService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceType` to the `TechService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "camera" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "price12Months" DOUBLE PRECISION,
ADD COLUMN     "price16Months" DOUBLE PRECISION,
ADD COLUMN     "price4Months" DOUBLE PRECISION,
ADD COLUMN     "price8Months" DOUBLE PRECISION,
ADD COLUMN     "processor" TEXT,
ADD COLUMN     "ram" TEXT,
ADD COLUMN     "storage" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TechService" ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "deviceType" TEXT NOT NULL,
ADD COLUMN     "serialNumber" TEXT;
