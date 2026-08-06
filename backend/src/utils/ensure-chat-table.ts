import prisma from "../config/prisma";

export const ensureChatTable = async () => {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Chat" (
      "id" SERIAL NOT NULL,
      "title" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL,
      CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
    )
  `);

  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'Message'
          AND column_name = 'chatId'
      ) THEN
        ALTER TABLE "Message"
        ADD COLUMN "chatId" INTEGER NOT NULL DEFAULT 1;
      END IF;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE table_name = 'Message'
          AND constraint_name = 'Message_chatId_fkey'
      ) THEN
        ALTER TABLE "Message"
        ADD CONSTRAINT "Message_chatId_fkey"
        FOREIGN KEY ("chatId") REFERENCES "Chat"("id")
        ON DELETE CASCADE ON UPDATE CASCADE;
      END IF;
    END $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Message_chatId_idx" ON "Message"("chatId")
  `);
};