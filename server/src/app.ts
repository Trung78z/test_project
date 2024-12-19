import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import RootRouter from "./routes";
import { logger } from "./logger";
import path from "path";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4000",
      "http://localhost:3000",
      "http://localhost:4173",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", true);
}

app.use((req, res, next) => {
  logger.info(`Nhận yêu cầu từ ip: ${req.ip} method: ${req.method} ${req.url}`);

  next();
});
app.use(express.static(path.join(__dirname + "public")));
app.use("/api", RootRouter);

export default app;
