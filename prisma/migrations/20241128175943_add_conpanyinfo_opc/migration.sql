-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_companyInfoId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "companyInfoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_companyInfoId_fkey" FOREIGN KEY ("companyInfoId") REFERENCES "CompanyInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
