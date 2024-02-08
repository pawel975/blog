import React, { ReactNode } from "react";
import { Container } from "reactstrap";
import AdminNavMenu from "./AdminNavMenu/AdminNavMenu";

interface LayoutProps {
  children: ReactNode;
  header: string;
}

const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <div>
      <AdminNavMenu />
      <Container className="d-flex flex-column align gap-2 pb-4" tag="main">
        <header>
          <h1>{header}</h1>
          <hr></hr>
        </header>
        <div>{children}</div>
      </Container>
    </div>
  );
};

export default Layout;
