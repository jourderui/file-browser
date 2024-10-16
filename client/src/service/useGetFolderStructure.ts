import { useState } from "react";
import { FolderStructureDto } from "../types/interfaces/FolderStructureDto";
import { getFolderStructure } from "./FolderStructure";

export const useLazyFolderStructure = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<FolderStructureDto | null>(null);

  const fetchFolderStructure = async (
    path: string,
    abortController: AbortController
  ): Promise<void> => {
    setLoading(true);
    getFolderStructure(path, abortController.signal)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        setData(null);
        if (
          error.code !== 20 &&
          error.message !== "signal is aborted without reason"
        ) {
          console.error(error);
        }
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });
  };

  return { fetchFolderStructure, loading, data };
};
