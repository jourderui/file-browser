import { ReactElement, ReactNode } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface Props {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ className }: Props): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="success">
        <Toolbar variant="dense">
          <Typography variant="h3" color="inherit" component="div">
            Ultima File Browser
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
