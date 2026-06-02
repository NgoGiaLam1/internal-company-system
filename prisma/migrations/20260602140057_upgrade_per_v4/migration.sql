/*
  Warnings:

  - You are about to drop the `TblModulePermission` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[moduleId,name]` on the table `TblPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TblModulePermission" DROP CONSTRAINT "TblModulePermission_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TblModulePermission" DROP CONSTRAINT "TblModulePermission_permissionId_fkey";

-- AlterTable
ALTER TABLE "TblPermission" ADD COLUMN     "moduleId" TEXT;

-- DropTable
DROP TABLE "TblModulePermission";

-- CreateIndex
CREATE UNIQUE INDEX "TblPermission_moduleId_name_key" ON "TblPermission"("moduleId", "name");

-- AddForeignKey
ALTER TABLE "TblPermission" ADD CONSTRAINT "TblPermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TblModule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
