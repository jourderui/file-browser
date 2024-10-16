import fs from "node:fs";
import { ParsedQs } from "qs";
import { SUPPORTED_CONTENT } from "../../types/enums/SupportedContent";
import DirectoryEntry from "../../types/interfaces/DirectoryEntry";
import getFileType from "../logic/getFileType";

export const readFileSystem = (
  path: string | ParsedQs | string[] | ParsedQs[] | undefined
): DirectoryEntry[] => {
  const directoryTree: DirectoryEntry[] = [];
  const stringPath = !Array.isArray(path)
    ? (path as string)
    : (path[0] as string);
  try {
    fs.readdirSync(stringPath, {
      withFileTypes: true,
      recursive: false,
    }).forEach((entry) => {
      directoryTree.push({
        name: entry.name,
        type: getFileType(entry, `${stringPath}${entry.name}`),
      });
    });
  } catch (err: any) {
    if (err && err.code && err.code === "EPERM") {
      directoryTree.push({
        name: "",
        type: SUPPORTED_CONTENT.RESTRICTED,
        error: err,
        message: "Operation not permitted!",
      });
    } else if (err && err.code && err.code === "ENOENT") {
      directoryTree.push({
        name: "",
        type: SUPPORTED_CONTENT.UNSUPPORTED,
        error: err,
        message: "Path not found!",
      });
    }
    console.error(err);
  }
  return directoryTree;
};
