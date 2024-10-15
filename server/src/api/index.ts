import express from "express";

import { DirResponse } from "../interfaces/DirResponse";
import fs, { Dirent } from "node:fs";
import { ParsedQs } from "qs";
import ErrorResponse from "../interfaces/ErrorResponse";
import { DirEntry, SUPPORTED_CONTENT } from "../interfaces/Models";

const router = express.Router();

router.get<{}, DirResponse | ErrorResponse>("/", async (req, res) => {
  const path: string | ParsedQs | string[] | ParsedQs[] | undefined =
    req.query.path;
  function getEntryType(result: Dirent): SUPPORTED_CONTENT {
    if (result.isDirectory()) {
      return SUPPORTED_CONTENT.DIRECTORY;
    } else if (result.isFile()) {
      return SUPPORTED_CONTENT.FILE;
    } else {
      return SUPPORTED_CONTENT.UNSUPPORTED;
    }
  }

  const pathLike = path as string;
  const fileTree: DirEntry[] = [];
  let stack: string | undefined = undefined;

  try {
    const results: Dirent[] = fs.readdirSync(pathLike, { withFileTypes: true });
    results.forEach(function (result) {
      fileTree.push({
        name: result.name,
        type: getEntryType(result),
      });
    });
  } catch (err: any) {
    if (err && err.code && err.code === "ENOENT") {
      stack = "Path Not Found!";
    } else {
      throw err;
    }
  }

  res.json({
    data: fileTree,
    stack: stack,
  });
});

export default router;
