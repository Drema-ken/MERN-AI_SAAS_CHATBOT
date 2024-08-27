import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import { generateChat } from "../controllers/chats";

const chatRouter = Router();

//protected routes
chatRouter.post("/new", verifyToken, generateChat);

export default chatRouter;
