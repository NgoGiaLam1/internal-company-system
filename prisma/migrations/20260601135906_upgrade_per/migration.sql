/*
  Warnings:

  - A unique constraint covering the columns `[moduleId,name]` on the table `TblPermission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TblPermission_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "TblPermission_moduleId_name_key" ON "TblPermission"("moduleId", "name");
