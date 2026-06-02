/*
  Warnings:

  - You are about to drop the column `moduleId` on the `TblPermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `TblPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "TblPermission" DROP CONSTRAINT "TblPermission_moduleId_fkey";

-- DropIndex
DROP INDEX "TblPermission_moduleId_name_key";

-- AlterTable
ALTER TABLE "TblPermission" DROP COLUMN "moduleId";

-- CreateTable
CREATE TABLE "TblModulePermission" (
    "moduleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "TblModulePermission_pkey" PRIMARY KEY ("moduleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TblPermission_name_key" ON "TblPermission"("name");

-- AddForeignKey
ALTER TABLE "TblModulePermission" ADD CONSTRAINT "TblModulePermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TblModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblModulePermission" ADD CONSTRAINT "TblModulePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "TblPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
