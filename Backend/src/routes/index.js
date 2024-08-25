import { Router } from "express";
import userRouter from "./users.js";
import chatRouter from "./chats.js";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/chats", chatRouter);

export default appRouter;
