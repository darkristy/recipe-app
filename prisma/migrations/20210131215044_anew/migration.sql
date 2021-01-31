/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `ingredients` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `recipe` table. All the data in the column will be lost.
  - The migration will change the primary key for the `user` table. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tokenVersion` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - The migration will add a unique constraint covering the columns `[image_url]` on the table `recipe`. If there are existing duplicate values, the migration will fail.
  - Added the required column `image_url` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookTime` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTime` to the `recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cuisineId` to the `recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "recipe.imageUrl_unique";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "recipe" DROP CONSTRAINT "recipe_userId_fkey";

-- AlterTable
ALTER TABLE "recipe" DROP COLUMN "imageUrl",
DROP COLUMN "ingredients",
DROP COLUMN "instructions",
DROP COLUMN "categoryId",
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "cookTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "prepTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cuisineId" INTEGER NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "tokenVersion",
ADD COLUMN     "token_version" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurmentUnit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurmentQty" (
    "id" SERIAL NOT NULL,
    "amount" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipeIngredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "measurmentQtyId" INTEGER NOT NULL,
    "measurmentUnitId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instruction" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuisine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "category";

-- CreateIndex
CREATE UNIQUE INDEX "ingredient.name_unique" ON "ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "measurmentUnit.name_unique" ON "measurmentUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "cuisine.name_unique" ON "cuisine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe.image_url_unique" ON "recipe"("image_url");

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD FOREIGN KEY ("measurmentQtyId") REFERENCES "measurmentQty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipeIngredient" ADD FOREIGN KEY ("measurmentUnitId") REFERENCES "measurmentUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instruction" ADD FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD FOREIGN KEY ("cuisineId") REFERENCES "cuisine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
