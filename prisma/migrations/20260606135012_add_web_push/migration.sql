-- CreateTable
CREATE TABLE "TblPushSubscription" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TblPushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TblPushSubscription_employeeId_idx" ON "TblPushSubscription"("employeeId");

-- AddForeignKey
ALTER TABLE "TblPushSubscription" ADD CONSTRAINT "TblPushSubscription_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "TblEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
