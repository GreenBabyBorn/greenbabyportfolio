/*
  Warnings:

  - You are about to drop the `ProjectLink` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gitLink` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectLink" DROP CONSTRAINT "ProjectLink_projectId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "gitLink" TEXT NOT NULL,
ADD COLUMN     "video" TEXT;

-- DropTable
DROP TABLE "ProjectLink";
