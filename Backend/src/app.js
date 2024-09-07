import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { createToken } from "./utils/token-manager.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://mern-ai-saas-chatbot-2.onrender.com/",
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(cors());

//only for dev
app.use(morgan("dev"));

//middlewares
app.use("/api/v1", appRouter);

export default app;
