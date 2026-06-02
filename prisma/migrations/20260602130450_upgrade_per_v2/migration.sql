-- DropForeignKey
ALTER TABLE "TblPermission" DROP CONSTRAINT "TblPermission_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "TblRolePermission" DROP CONSTRAINT "TblRolePermission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "TblRolePermission" DROP CONSTRAINT "TblRolePermission_roleId_fkey";

-- AddForeignKey
ALTER TABLE "TblPermission" ADD CONSTRAINT "TblPermission_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "TblModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblRolePermission" ADD CONSTRAINT "TblRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "TblPermission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblRolePermission" ADD CONSTRAINT "TblRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TblRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
