import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ReactElement, useEffect, useState } from "react";
import { useLazyFolderStructure } from "../../service/useGetFolderStructure";
import { ParamFilter } from "../../models/ParamFilter";
import { useLocation, useSearchParams } from "react-router-dom";
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

export const App = (): ReactElement => {
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  console.log("searchParams", searchParams);
  console.log("location", location);

  // const [filter, setFilter] = useState<ParamFilter>(defaultFilter);

  const { fetchFolderStructure, loading, data } = useLazyFolderStructure();
  useEffect(() => {
    const dataAbortController = new AbortController();
    fetchFolderStructure("/", dataAbortController);
    return () => {
      dataAbortController.abort(); // abort when input changes or form unmounts
    };
  }, [searchParams]);

  const renderFileBrowser = (fileStructure: any): ReactElement | null => {
    if (fileStructure && fileStructure.data) {
      const fileStructureData = fileStructure.data;
      return fileStructureData.map((file: any) => {
        console.log(file);
        return (
          <Box className="browser-box">
            <ListItem key={file.name}>
              <ListItemAvatar>
                <Avatar>
                  {file.type === SUPPORTED_CONTENT.DIRECTORY && <FolderIcon />}
                  {file.type === SUPPORTED_CONTENT.FILE && <FilePresentIcon />}
                  {file.type === SUPPORTED_CONTENT.RESTRICTED && <LockIcon />}
                  {file.type === SUPPORTED_CONTENT.UNSUPPORTED && (
                    <CancelIcon />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={file.name} />
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
          <Box className="browser-box">
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
