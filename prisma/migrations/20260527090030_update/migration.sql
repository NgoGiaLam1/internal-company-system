-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'RESIGNED');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "TblEmployee" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "position" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "departmentId" TEXT,

    CONSTRAINT "TblEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblDepartment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "leaderId" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblTask" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "resultNote" TEXT,
    "resultUrl" TEXT,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "TblTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblLeaveRequest" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "status" "LeaveStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblLeaveRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblPermission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TblPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblRolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TblRolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TblEmployee_email_key" ON "TblEmployee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TblDepartment_name_key" ON "TblDepartment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TblRole_name_key" ON "TblRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TblPermission_name_key" ON "TblPermission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TblRolePermission_roleId_permissionId_key" ON "TblRolePermission"("roleId", "permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMembers_AB_unique" ON "_ProjectMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMembers_B_index" ON "_ProjectMembers"("B");

-- AddForeignKey
ALTER TABLE "TblEmployee" ADD CONSTRAINT "TblEmployee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "TblDepartment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblEmployee" ADD CONSTRAINT "TblEmployee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TblRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblProject" ADD CONSTRAINT "TblProject_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "TblEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblTask" ADD CONSTRAINT "TblTask_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "TblEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblTask" ADD CONSTRAINT "TblTask_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "TblProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblLeaveRequest" ADD CONSTRAINT "TblLeaveRequest_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "TblEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblRolePermission" ADD CONSTRAINT "TblRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "TblPermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblRolePermission" ADD CONSTRAINT "TblRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "TblRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMembers" ADD CONSTRAINT "_ProjectMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "TblEmployee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMembers" ADD CONSTRAINT "_ProjectMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "TblProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
