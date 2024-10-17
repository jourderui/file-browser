import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReactElement, useEffect } from "react";
import { useLazyGetFolderStructure } from "../../service/useLazyGetFolderStructure";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import FolderIcon from "@mui/icons-material/Folder";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import CancelIcon from "@mui/icons-material/Cancel";
import LockIcon from "@mui/icons-material/Lock";
import { SUPPORTED_CONTENT } from "../../types/enums/SupportedContent";
import "./App.css";
import DirectoryEntry from "../../types/interfaces/DirectoryEntry";
import FolderStructureDto from "../../types/interfaces/FolderStructureDto";

export const App = (): ReactElement => {
  let location = useLocation();
  const navigate = useNavigate();
  const { fetchFolderStructure, loading, data } = useLazyGetFolderStructure();

  useEffect(() => {
    const dataAbortController = new AbortController();
    fetchFolderStructure(location.pathname, dataAbortController);
    return () => {
      dataAbortController.abort(); // abort when input changes or form unmounts
    };
  }, [location.pathname]);

  const onClickDirectoryEntry = (entry: DirectoryEntry) => {
    if (entry.type === SUPPORTED_CONTENT.DIRECTORY) {
      navigate(
        `${location.pathname}${location.pathname !== "/" ? "/" : ""}${
          entry.name
        }`
      );
    }
  };

  const onClickLevelUp = () => {
    var path = location.pathname.substring(
      0,
      location.pathname.lastIndexOf("/")
    );
    navigate(path);
  };

  const renderFileBrowser = (
    folderStructure: FolderStructureDto | null
  ): ReactElement[] | null => {
    if (folderStructure && folderStructure.data) {
      const directoryEntry: DirectoryEntry[] = folderStructure.data;
      return directoryEntry.map((entry: DirectoryEntry) => {
        return (
          <Box
            className={`browser-box ${
              entry.type === SUPPORTED_CONTENT.DIRECTORY && "directory"
            }`}
            onClick={() => onClickDirectoryEntry(entry)}
            key={entry.name}
          >
            <ListItem key={entry.name}>
              <ListItemAvatar>
                <Avatar>
                  {entry.type === SUPPORTED_CONTENT.DIRECTORY && <FolderIcon />}
                  {entry.type === SUPPORTED_CONTENT.FILE && <FilePresentIcon />}
                  {entry.type === SUPPORTED_CONTENT.RESTRICTED && <LockIcon />}
                  {entry.type === SUPPORTED_CONTENT.UNSUPPORTED && (
                    <CancelIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={entry.name} />
            </ListItem>
          </Box>
        );
      });
    }
    return null;
  };

  return (
    <>
      <Container className="browser-container">
        <List
          sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}
        >
          <Box
            className="browser-box directory"
            onClick={() => onClickLevelUp()}
            key={"points"}
          >
            <ListItem>
              <ListItemText inset primary={"..."} />
            </ListItem>
          </Box>

          {renderFileBrowser(data)}
        </List>
      </Container>
    </>
  );
};
