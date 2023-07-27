/*
  Warnings:

  - Added the required column `name` to the `ProjectLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectLink" ADD COLUMN     "name" TEXT NOT NULL;
