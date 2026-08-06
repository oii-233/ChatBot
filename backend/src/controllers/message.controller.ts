import { Request, Response } from "express";
import {
  createMessage,
  getMessages,
} from "../services/message.service";


export const addMessage = async (
  req: Request,
  res: Response
) => {
  try {
    const { content, role, chatId } = req.body;

    const message = await createMessage(
      content,
      role,
      chatId
    );

    res.status(201).json(message);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create message",
    });
  }
};


export const fetchMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const chatId = Number(req.query.chatId);

    const messages = await getMessages(chatId);

    res.json(messages);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get messages",
    });
  }
};