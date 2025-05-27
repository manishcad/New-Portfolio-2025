/*
  Warnings:

  - You are about to drop the column `demo` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - Added the required column `githubLink` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageData` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageName` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageType` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "demo",
DROP COLUMN "github",
DROP COLUMN "image",
ADD COLUMN     "githubLink" TEXT NOT NULL,
ADD COLUMN     "imageData" BYTEA NOT NULL,
ADD COLUMN     "imageName" TEXT NOT NULL,
ADD COLUMN     "imageType" TEXT NOT NULL,
ADD COLUMN     "liveDemo" TEXT;
