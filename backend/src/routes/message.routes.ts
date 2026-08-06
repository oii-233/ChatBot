import { Router } from "express";
import {
  addMessage,
  fetchMessages,
} from "../controllers/message.controller";


const router = Router();


router.post("/", addMessage);

router.get("/", fetchMessages);


export default router;