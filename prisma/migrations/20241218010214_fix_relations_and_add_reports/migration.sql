/*
  Warnings:

  - The `createdAt` column on the `TechService` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TechService" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_TechServiceToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TechServiceToUser_AB_unique" ON "_TechServiceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TechServiceToUser_B_index" ON "_TechServiceToUser"("B");

-- AddForeignKey
ALTER TABLE "_TechServiceToUser" ADD CONSTRAINT "_TechServiceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "TechService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechServiceToUser" ADD CONSTRAINT "_TechServiceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
