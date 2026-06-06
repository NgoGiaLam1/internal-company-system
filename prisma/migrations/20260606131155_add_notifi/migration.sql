-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('SYSTEM', 'GENERAL', 'TASK', 'PROJECT', 'LEAVE', 'COMMENT');

-- CreateTable
CREATE TABLE "TblNotification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "type" "NotificationType" NOT NULL DEFAULT 'GENERAL',
    "senderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TblNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TblNotificationRecipient" (
    "id" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TblNotificationRecipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TblNotification_senderId_idx" ON "TblNotification"("senderId");

-- CreateIndex
CREATE INDEX "TblNotification_createdAt_idx" ON "TblNotification"("createdAt");

-- CreateIndex
CREATE INDEX "TblNotificationRecipient_employeeId_idx" ON "TblNotificationRecipient"("employeeId");

-- CreateIndex
CREATE INDEX "TblNotificationRecipient_employeeId_isRead_idx" ON "TblNotificationRecipient"("employeeId", "isRead");

-- CreateIndex
CREATE INDEX "TblNotificationRecipient_notificationId_idx" ON "TblNotificationRecipient"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "TblNotificationRecipient_notificationId_employeeId_key" ON "TblNotificationRecipient"("notificationId", "employeeId");

-- AddForeignKey
ALTER TABLE "TblNotification" ADD CONSTRAINT "TblNotification_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "TblEmployee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblNotificationRecipient" ADD CONSTRAINT "TblNotificationRecipient_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "TblNotification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TblNotificationRecipient" ADD CONSTRAINT "TblNotificationRecipient_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "TblEmployee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
