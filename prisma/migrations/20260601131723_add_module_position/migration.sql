/*
  Warnings:

  - Added the required column `position` to the `TblModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TblModule" ADD COLUMN     "position" INTEGER NOT NULL;
