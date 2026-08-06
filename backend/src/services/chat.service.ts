import prisma from "../config/prisma";

import { generateAIResponse } from "./gemini.service";

type ChatRow = {
  id: number;
  title: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const createChat = async (title?: string) => {
  const [chat] = await prisma.$queryRaw<ChatRow[]>`
    INSERT INTO "Chat" ("title", "createdAt", "updatedAt")
    VALUES (${title ?? null}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    RETURNING "id", "title", "createdAt", "updatedAt"
  `;

  return chat;
};

const createChatTitle = (content: string) => {
  const normalized = content.trim().replace(/\s+/g, " ");
  const words = normalized.split(" ").filter(Boolean).slice(0, 6);
  const title = words.join(" ");

  return title.length > 40 ? `${title.slice(0, 37)}...` : title;
};

const shouldUpdateChatTitle = (title: string | null) => {
  return !title || title.trim().toLowerCase() === "new chat";
};

export const getChats = async () => {
  return await prisma.$queryRaw<ChatRow[]>`
    SELECT "id", "title", "createdAt", "updatedAt"
    FROM "Chat"
    ORDER BY "updatedAt" DESC
  `;
};

export const getChatMessages = async (chatId: number) => {
  return await prisma.$queryRaw`
    SELECT "id", "content", "role", "chatId", "createdAt"
    FROM "Message"
    WHERE "chatId" = ${chatId}
    ORDER BY "createdAt" ASC
  `;
};

export const sendChatMessage = async (chatId: number, content: string) => {
  const existingChat = await prisma.$queryRaw<{ title: string | null }[]>`
    SELECT "title"
    FROM "Chat"
    WHERE "id" = ${chatId}
    LIMIT 1
  `;

  if (shouldUpdateChatTitle(existingChat[0]?.title ?? null)) {
    await prisma.$executeRaw`
      UPDATE "Chat"
      SET "title" = ${createChatTitle(content)},
          "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${chatId}
    `;
  }

  await prisma.$executeRaw`
    INSERT INTO "Message" ("chatId", "content", "role")
    VALUES (${chatId}, ${content}, 'user')
  `;

  const aiMessage = await generateAIResponse(content);

  await prisma.$executeRaw`
    INSERT INTO "Message" ("chatId", "content", "role")
    VALUES (${chatId}, ${aiMessage}, 'assistant')
  `;

  await prisma.$executeRaw`
    UPDATE "Chat"
    SET "updatedAt" = CURRENT_TIMESTAMP
    WHERE "id" = ${chatId}
  `;

  return aiMessage;
};