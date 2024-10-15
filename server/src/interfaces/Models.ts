export enum SUPPORTED_CONTENT {
  DIRECTORY = "DIR",
  FILE = "FILE",
  UNSUPPORTED = "UNSUPPORTED",
}

export interface DirEntry {
  name: string;
  type: SUPPORTED_CONTENT | undefined;
}
