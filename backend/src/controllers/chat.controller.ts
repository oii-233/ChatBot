import { Request, Response } from "express";
import {
  createChat as createChatService,
  getChatMessages,
  getChats,
  sendChatMessage,
} from "../services/chat.service";


export const createChat = async (
  req: Request,
  res: Response
) => {

  try {
    const { title } = req.body;

    const chat = await createChatService(title);

    res.status(201).json(chat);


  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to create chat",
    });

  }
};

export const fetchChats = async (
  req: Request,
  res: Response
) => {
  try {
    const chats = await getChats();

    res.json(chats);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get chats",
    });
  }
};

export const fetchChatMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const chatId = Number(req.params.id);

    const messages = await getChatMessages(chatId);

    res.json(messages);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to get chat messages",
    });
  }
};

export const postChatMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const chatId = Number(req.params.id);
    const { message } = req.body;

    const aiMessage = await sendChatMessage(chatId, message);

    res.json({
      message: aiMessage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "AI response failed",
    });
  }
};