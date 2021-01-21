/*
  Warnings:

  - You are about to drop the column `hello` on the `category` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "category.hello_unique";

-- AlterTable
ALTER TABLE "category" DROP COLUMN "hello";
