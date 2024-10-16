import fs, { Dirent } from "node:fs";
import { SUPPORTED_CONTENT } from "../../types/enums/SupportedContent";

export default function getFileType(
  fileName: Dirent,
  filePath: string
): SUPPORTED_CONTENT {
  if (fileName.isDirectory()) {
    return SUPPORTED_CONTENT.DIRECTORY;
  } else if (fileName.isFile()) {
    return SUPPORTED_CONTENT.FILE;
  } else if (fileName.isSymbolicLink()) {
    try {
      const filePathScan = fs.readdirSync(filePath);
      if (filePathScan.length > 0) {
        return SUPPORTED_CONTENT.DIRECTORY;
      }
    } catch (err: any) {
      if (err && err.code && err.code === "EPERM") {
        return SUPPORTED_CONTENT.RESTRICTED;
      } else if (err && err.code && err.code === "ENOENT") {
        return SUPPORTED_CONTENT.FILE;
      }
    }
    return SUPPORTED_CONTENT.UNSUPPORTED;
  } else {
    return SUPPORTED_CONTENT.UNSUPPORTED;
  }
}
