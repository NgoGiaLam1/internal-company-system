/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `TblPushSubscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TblPushSubscription_endpoint_key" ON "TblPushSubscription"("endpoint");
