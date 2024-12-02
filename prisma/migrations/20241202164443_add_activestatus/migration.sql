-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "active" "ActiveStatus" NOT NULL DEFAULT 'ENABLED';

-- AlterTable
ALTER TABLE "TechService" ADD COLUMN     "active" "ActiveStatus" NOT NULL DEFAULT 'ENABLED';
