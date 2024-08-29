import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { generateChat } from "../controllers/chats.js";

const chatRouter = Router();

//protected routes
chatRouter.post("/new", verifyToken, generateChat);

export default chatRouter;
