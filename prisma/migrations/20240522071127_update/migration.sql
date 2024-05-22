/*
  Warnings:

  - The `image` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `regionId` on the `EventLocalization` table. All the data in the column will be lost.
  - You are about to drop the `EventFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EventRegister` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegionFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `regionName` to the `EventLocalization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EventFollow" DROP CONSTRAINT "EventFollow_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventFollow" DROP CONSTRAINT "EventFollow_userId_fkey";

-- DropForeignKey
ALTER TABLE "EventLocalization" DROP CONSTRAINT "EventLocalization_regionId_fkey";

-- DropForeignKey
ALTER TABLE "EventRegister" DROP CONSTRAINT "EventRegister_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventRegister" DROP CONSTRAINT "EventRegister_userId_fkey";

-- DropForeignKey
ALTER TABLE "RegionFollow" DROP CONSTRAINT "RegionFollow_regionId_fkey";

-- DropForeignKey
ALTER TABLE "RegionFollow" DROP CONSTRAINT "RegionFollow_userId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToImage" DROP CONSTRAINT "_EventToImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToImage" DROP CONSTRAINT "_EventToImage_B_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "image",
ADD COLUMN     "image" JSONB;

-- AlterTable
ALTER TABLE "EventLocalization" DROP COLUMN "regionId",
ADD COLUMN     "regionName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "EventFollow";

-- DropTable
DROP TABLE "EventRegister";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Region";

-- DropTable
DROP TABLE "RegionFollow";

-- DropTable
DROP TABLE "_EventToImage";

-- CreateTable
CREATE TABLE "EventSubscribe" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "EventSubscribe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventSubscribe" ADD CONSTRAINT "EventSubscribe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubscribe" ADD CONSTRAINT "EventSubscribe_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
