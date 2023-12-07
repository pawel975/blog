import React from "react";
import { Container } from "reactstrap";
import BlogNavMenu from "./BlogNavMenu/BlogNavMenu";

const Layout = ({ children }) => {
  return (
    <div>
      <BlogNavMenu />
      <Container tag="main">{children}</Container>
    </div>
  );
};

export default Layout;
