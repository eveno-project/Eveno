/*
  Warnings:

  - You are about to drop the column `publishedhAt` on the `Event` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventLocalization" DROP CONSTRAINT "EventLocalization_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventNetwork" DROP CONSTRAINT "EventNetwork_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventNote" DROP CONSTRAINT "EventNote_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventSubscribe" DROP CONSTRAINT "EventSubscribe_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventTag" DROP CONSTRAINT "EventTag_eventId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "publishedhAt",
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventNetwork" ADD CONSTRAINT "EventNetwork_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventLocalization" ADD CONSTRAINT "EventLocalization_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSubscribe" ADD CONSTRAINT "EventSubscribe_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventNote" ADD CONSTRAINT "EventNote_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
