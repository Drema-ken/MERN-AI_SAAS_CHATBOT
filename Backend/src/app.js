import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

//only for dev
app.use(morgan("dev"));
app.get("/", (req, res) => {
  res.send("good");
});
//middlewares
app.use("/api/v1", appRouter);

export default app;
