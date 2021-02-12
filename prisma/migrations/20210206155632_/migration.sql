/*
  Warnings:

  - You are about to drop the column `token_version` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "token_version",
ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 0;
