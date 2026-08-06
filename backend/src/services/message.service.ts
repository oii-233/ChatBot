import prisma from "../config/prisma";

type MessageRow = {
  id: number;
  content: string;
  role: string;
  chatId: number;
  createdAt: Date;
};

export const createMessage = async (
  content: string,
  role: string,
  chatId: number
) => {
  const [message] = await prisma.$queryRaw<MessageRow[]>`
    INSERT INTO "Message" ("content", "role", "chatId")
    VALUES (${content}, ${role}, ${chatId})
    RETURNING "id", "content", "role", "chatId", "createdAt"
  `;

  return message;
};


export const getMessages = async (chatId: number) => {
  return await prisma.$queryRaw<MessageRow[]>`
    SELECT "id", "content", "role", "chatId", "createdAt"
    FROM "Message"
    WHERE "chatId" = ${chatId}
    ORDER BY "createdAt" ASC
  `;
};