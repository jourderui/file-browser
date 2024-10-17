import config from "../config/config";
import FolderStructureDto from "../types/interfaces/FolderStructureDto";
import { GET } from "./baseService";

export const getFolderStructure = async (
  path: string,
  abortSignal?: AbortSignal
): Promise<FolderStructureDto> => {
  const url = new URL(`${config.HOST}:${config.PORT}/?path=${path}`);
  const response = await GET(url.toString(), undefined, abortSignal);
  return await response.json();
};
