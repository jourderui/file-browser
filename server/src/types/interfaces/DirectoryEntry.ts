import { SUPPORTED_CONTENT } from "../enums/SupportedContent";

export default interface DirectoryEntry {
  name: string;
  type: SUPPORTED_CONTENT;
  error?: unknown;
  message?: string;
}
