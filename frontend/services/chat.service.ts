import api from "@/lib/api";
import { Chat } from "@/types/chat";
import { Message } from "@/types/message";

export async function getChats(): Promise<Chat[]> {
  const response = await api.get("/chats");

  return response.data;
}

export async function createChat(title?: string): Promise<Chat> {
  const response = await api.post("/chats", {
    title,
  });

  return response.data;
}

export async function getChatMessages(chatId: number): Promise<Message[]> {
  const response = await api.get(`/chats/${chatId}/messages`);

  return response.data;
}

export async function sendMessage(chatId: number, message: string) {
  const response = await api.post(`/chats/${chatId}/messages`, {
    message,
  });

  return response.data;
}