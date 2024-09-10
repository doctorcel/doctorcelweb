/*
  Warnings:

  - Added the required column `warehouseId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `TechService` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "warehouseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TechService" ADD COLUMN     "warehouseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TechService" ADD CONSTRAINT "TechService_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
