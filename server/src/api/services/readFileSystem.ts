import fs from "node:fs";
import { SUPPORTED_CONTENT } from "../../types/enums/SupportedContent";
import DirEntry from "../../types/interfaces/DirEntry";
import getFileType from "../logic/getFileType";

export const readFileSystem = (path: any) => {
  const fileTree: DirEntry[] = [];
  try {
    fs.readdirSync(path as string, {
      withFileTypes: true,
      recursive: false,
    }).forEach((fileName) => {
      fileTree.push({
        name: fileName.name,
        type: getFileType(fileName, `${path as string}${fileName.name}`),
      });
    });
  } catch (err: any) {
    if (err && err.code && err.code === "EPERM") {
      fileTree.push({
        name: "",
        type: SUPPORTED_CONTENT.RESTRICTED,
        error: err,
        message: "Operation not permitted!",
      });
    } else if (err && err.code && err.code === "ENOENT") {
      fileTree.push({
        name: "",
        type: SUPPORTED_CONTENT.UNSUPPORTED,
        error: err,
        message: "Path not found!",
      });
    }
    console.error(err);
  }
  return fileTree;
};
