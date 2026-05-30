-- CreateTable
CREATE TABLE "TblTaskComment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TblTaskComment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TblTaskComment_taskId_idx" ON "TblTaskComment"("taskId");

-- AddForeignKey
ALTER TABLE "TblTaskComment" ADD CONSTRAINT "TblTaskComment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "TblTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblTaskComment" ADD CONSTRAINT "TblTaskComment_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "TblEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
