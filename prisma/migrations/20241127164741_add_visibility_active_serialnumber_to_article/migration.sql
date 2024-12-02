-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('ENABLED', 'DISABLED');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ENABLED', 'DISABLED');

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "active" "ActiveStatus" NOT NULL DEFAULT 'ENABLED',
ADD COLUMN     "serialNumber" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "visible" "Visibility" NOT NULL DEFAULT 'DISABLED';
