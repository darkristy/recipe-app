/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[hello]` on the table `category`. If there are existing duplicate values, the migration will fail.
  - Added the required column `hello` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "category" ADD COLUMN     "hello" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "category.hello_unique" ON "category"("hello");
