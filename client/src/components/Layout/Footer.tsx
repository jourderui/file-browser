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

export const Footer = ({ className }: Props): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="success">
        <Toolbar variant="dense"></Toolbar>
      </AppBar>
    </Box>
  );
};
