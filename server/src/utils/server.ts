import express from "express";
import { Express } from "express-serve-static-core";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "../middlewares/middlewares";
import getDirectoryTree from "../api/controller/getDirectoryTree";

export async function createServer(): Promise<Express> {
  const server = express();
  require("dotenv").config();

  server.use(morgan("dev"));
  server.use(helmet());
  server.use(cors());
  server.use(express.json());

  server.use("/", getDirectoryTree);

  server.use(middlewares.notFound);
  server.use(middlewares.errorHandler);
  return server;
}
