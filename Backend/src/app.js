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
  cors({ origin: "https://mern-ai-chatbot-3b745.web.app", credentials: true })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
//app.use(cors());

//only for dev
app.use(morgan("dev"));
app.get("/", (req, res) => {
  const expires = new Date();
  const token = createToken("paymaster", "drema", "7d");

  expires.setDate(expires.getDate() + 7);
  res.cookie("auth_token", token, {
    path: "/",
    domain: "mern-ai-chatbot-3b745.web.app",
    httpOnly: false,
    secure: true,
    expires,
    signed: true,
    sameSite: "none",
  });
  res.send("why isn't cookie set");
});
//middlewares
app.use("/api/v1", appRouter);

export default app;
