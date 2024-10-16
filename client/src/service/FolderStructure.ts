import config from "../config/config";
import { FolderStructureDto } from "../types/interfaces/FolderStructureDto";
import { ParamFilter, ParamFilterParser } from "../models/ParamFilter";
import { GET } from "./baseService";

export const getFolderStructure = async (
  path: string,
  abortSignal?: AbortSignal
): Promise<FolderStructureDto> => {
  // const filterParser = new ParamFilterParser(filter);
  const url = new URL(`${config.HOST}:${config.PORT}/?path=/`);
  const response = await GET(url.toString(), undefined, abortSignal);
  return await response.json();
};
