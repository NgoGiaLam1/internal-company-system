-- AlterTable
ALTER TABLE "TblPermission" ADD COLUMN     "moduleId" TEXT;

-- CreateTable
CREATE TABLE "TblModule" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblModule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TblModule_name_key" ON "TblModule"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TblModule_href_key" ON "TblModule"("href");

-- AddForeignKey
ALTER TABLE "TblPermission" ADD CONSTRAINT "TblPermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TblModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
