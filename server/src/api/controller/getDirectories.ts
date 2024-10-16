import express from "express";
import { ParsedQs } from "qs";
import DirResponse from "../../types/interfaces/DirResponse";
import DirEntry from "../../types/interfaces/DirEntry";
import { Request, Response, NextFunction } from "express";
import { readFileSystem } from "../services/readFileSystem";

const router = express.Router();

router.get<{}, DirResponse>(
  "/",
  async (req: Request, res: Response, _next: NextFunction) => {
    const path: string | ParsedQs | string[] | ParsedQs[] | undefined =
      req.query.path;
    const fileTree: DirEntry[] | undefined = readFileSystem(path);
    res.json({ data: fileTree });
  }
);

export default router;
