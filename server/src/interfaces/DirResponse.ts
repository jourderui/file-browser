import { DirEntry } from "./Models";

export interface DirResponse {
  data: DirEntry[] | string;
}
