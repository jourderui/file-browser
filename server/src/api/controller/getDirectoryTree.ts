import express from "express";
import { ParsedQs } from "qs";
import FolderStructureDto from "../../types/interfaces/FolderStructureDto";
import DirectoryEntry from "../../types/interfaces/DirectoryEntry";
import { Request, Response, NextFunction } from "express";
import { readFileSystem } from "../services/readFileSystem";

const router = express.Router();

router.get<{}, FolderStructureDto>(
  "/",
  async (req: Request, res: Response, _next: NextFunction) => {
    const path: string | ParsedQs | string[] | ParsedQs[] | undefined =
      req.query.path;
    const directoryTree: DirectoryEntry[] = readFileSystem(path);
    res.json({ data: directoryTree });
  }
);

export default router;
