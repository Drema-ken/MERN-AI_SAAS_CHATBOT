import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./models/connect.js";
import mongoose from "mongoose";
import morgan from "morgan";
import appRouter from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());

//only for dev
app.use(morgan("dev"));

//middlewares
app.use("/api/v1", appRouter);

export default app;
