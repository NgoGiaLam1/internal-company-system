/*
  Warnings:

  - Made the column `moduleId` on table `TblPermission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TblPermission" DROP CONSTRAINT "TblPermission_moduleId_fkey";

-- AlterTable
ALTER TABLE "TblPermission" ALTER COLUMN "moduleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TblPermission" ADD CONSTRAINT "TblPermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TblModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
