import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChat, getAllUserChats } from "../controllers/chats.js";
import sendMessage from "../ai/config.js";
import { deleteAllChats } from "../controllers/chats.js";

const chatRouter = Router();

//protected routes
chatRouter.post("/new", verifyToken, generateChat);
chatRouter.get("/all-chats", verifyToken, getAllUserChats);
chatRouter.delete("/delete-chats", verifyToken, deleteAllChats);

export default chatRouter;
