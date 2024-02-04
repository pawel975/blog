import { Container } from "reactstrap";
import BlogNavMenu from "./BlogNavMenu/BlogNavMenu";
import { ReactNode } from "react";
import Footer from "./Footer/Footer";

interface BlogLayoutProps {
  children: ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
  return (
    <div className="blog-container d-flex flex-column">
      <BlogNavMenu />
      <Container className="d-flex flex-column gap-4" tag="main">
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default BlogLayout;
