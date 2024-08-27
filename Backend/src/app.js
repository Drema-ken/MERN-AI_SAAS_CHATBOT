import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); //change this when deploying
app.use(cookieParser(process.env.COOKIE_SECRET));

//only for dev
app.use(morgan("dev"));

//middlewares
app.use("/api/v1", appRouter);

export default app;
