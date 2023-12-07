import React from "react";
import { Container } from "reactstrap";
import AdminNavMenu from "./AdminNavMenu/AdminNavMenu";

const Layout = ({ children }) => {
  return (
    <div>
      <AdminNavMenu />
      <Container tag="main">{children}</Container>
    </div>
  );
};

export default Layout;
