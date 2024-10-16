import { SUPPORTED_CONTENT } from "../enums/SupportedContent";

export default interface DirEntry {
  name: string;
  type: SUPPORTED_CONTENT;
  error?: unknown;
  message?: string;
}
