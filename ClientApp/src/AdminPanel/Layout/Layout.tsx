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
      <Container className="d-grid gap-2" tag="main">
        <header>
          <h1>{header}</h1>
        </header>
        <hr></hr>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
