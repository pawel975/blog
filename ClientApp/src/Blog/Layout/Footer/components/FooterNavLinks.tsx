import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
const FooterNavLinks: React.FC = () => {
  return (
    <ul className="navbar-nav flex-grow flex-row gap-4">
      <NavItem className="blog-header">
        <NavLink className="p-0" tag={Link} to="/">
          Home
        </NavLink>
      </NavItem>
      <NavItem className="blog-header">
        <NavLink className="p-0" tag={Link} to="/blog/posts">
          Posts
        </NavLink>
      </NavItem>
    </ul>
  );
};

export default FooterNavLinks;
