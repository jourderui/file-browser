import { ReactElement, useEffect } from "react";
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

  return (
    <>
      <Header />
      <Content className="">
        <Outlet />
        {children}
      </Content>
      <Footer />
    </>
  );
};

export default Layout;
