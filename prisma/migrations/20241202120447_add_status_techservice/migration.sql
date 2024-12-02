/*
  Warnings:

  - You are about to drop the column `description` on the `TechService` table. All the data in the column will be lost.
  - Changed the type of `status` on the `TechService` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EN_REPARACION', 'REPARADO', 'ENTREGADO', 'GARANTIA', 'DEVOLUCION');

-- DropForeignKey
ALTER TABLE "TechService" DROP CONSTRAINT "TechService_technicianId_fkey";

-- AlterTable
ALTER TABLE "TechService" DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL,
ALTER COLUMN "technicianId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TechService" ADD CONSTRAINT "TechService_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
