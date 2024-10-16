import { ReactElement, useEffect } from "react";
import { ThemeProvider, THEME_ID, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const materialTheme = createTheme();

  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <Header />
      <Content className="">
        <Outlet />
        {children}
      </Content>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
