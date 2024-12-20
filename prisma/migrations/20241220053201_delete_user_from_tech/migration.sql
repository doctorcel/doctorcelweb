/*
  Warnings:

  - You are about to drop the `_TechServiceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TechServiceToUser" DROP CONSTRAINT "_TechServiceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TechServiceToUser" DROP CONSTRAINT "_TechServiceToUser_B_fkey";

-- DropTable
DROP TABLE "_TechServiceToUser";
