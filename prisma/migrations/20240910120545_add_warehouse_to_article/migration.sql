-- CreateTable
CREATE TABLE "Warehouse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- Create a default warehouse
INSERT INTO "Warehouse" (name, description) VALUES ('Bodega por defecto', 'Bodega creada automáticamente para artículos existentes');

-- Add the warehouseId column to Article, allowing NULL temporarily
ALTER TABLE "Article" ADD COLUMN "warehouseId" INTEGER;

-- Update existing articles to use the default warehouse
UPDATE "Article" SET "warehouseId" = (SELECT id FROM "Warehouse" LIMIT 1);

-- Now make warehouseId NOT NULL
ALTER TABLE "Article" ALTER COLUMN "warehouseId" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "Article" ADD CONSTRAINT "Article_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;