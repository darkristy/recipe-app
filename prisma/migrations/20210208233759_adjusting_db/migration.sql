/*
  Warnings:

  - You are about to drop the column `imagUrl` on the `recipe` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[imageUrl]` on the table `recipe`. If there are existing duplicate values, the migration will fail.
  - Added the required column `imageUrl` to the `recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "recipe.imagUrl_unique";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "imagUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "recipe.imageUrl_unique" ON "recipe"("imageUrl");
