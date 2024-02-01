import { Container } from "reactstrap";
import BlogNavMenu from "./BlogNavMenu/BlogNavMenu";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="blog-container">
      <BlogNavMenu />
      <Container tag="main">{children}</Container>
    </div>
  );
};

export default Layout;
