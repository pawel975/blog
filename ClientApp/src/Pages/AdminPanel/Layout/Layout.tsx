import React, { ReactNode } from "react";
import { Container } from "reactstrap";
import AdminNavMenu from "./AdminNavMenu/AdminNavMenu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <AdminNavMenu />
      <Container tag="main">{children}</Container>
    </div>
  );
};

export default Layout;
