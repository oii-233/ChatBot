import { Router } from "express";
import {
	createChat,
	fetchChatMessages,
	fetchChats,
	postChatMessage,
} from "../controllers/chat.controller";


const router = Router();


router.post("/", createChat);

router.get("/", fetchChats);

router.get("/:id/messages", fetchChatMessages);

router.post("/:id/messages", postChatMessage);


export default router;