/*
  Warnings:

  - You are about to drop the column `image_url` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `measurmentQty` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[imagUrl]` on the table `recipe`. If there are existing duplicate values, the migration will fail.
  - Added the required column `imagUrl` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurmentQty` to the `recipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "recipe.image_url_unique";

-- DropForeignKey
ALTER TABLE "recipeIngredient" DROP CONSTRAINT "recipeIngredient_measurmentQtyId_fkey";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "image_url",
ADD COLUMN     "imagUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipeIngredient" ADD COLUMN     "measurmentQty" TEXT NOT NULL;

-- DropTable
DROP TABLE "measurmentQty";

-- CreateIndex
CREATE UNIQUE INDEX "recipe.imagUrl_unique" ON "recipe"("imagUrl");
