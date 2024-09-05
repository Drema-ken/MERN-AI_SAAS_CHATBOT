import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChat, getAllUserChats } from "../controllers/chats.js";
import sendMessage from "../ai/config.js";
import { deleteAllChats } from "../controllers/chats.js";

const chatRouter = Router();

//protected routes
chatRouter.post("/new", generateChat);
chatRouter.get("/all-chats", getAllUserChats);
chatRouter.delete("/delete-chats", deleteAllChats);

export default chatRouter;
