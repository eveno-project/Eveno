-- DropForeignKey
ALTER TABLE "EventTag" DROP CONSTRAINT "EventTag_tagId_fkey";

-- AlterTable
ALTER TABLE "EventTag" ALTER COLUMN "tagId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
