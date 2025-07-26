/*
  Warnings:

  - You are about to drop the column `imageData` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `imageType` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "imageData",
DROP COLUMN "imageType",
ADD COLUMN     "imageUrl" TEXT;
