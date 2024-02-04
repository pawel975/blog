import { Link } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";
import LinkDivider from "../../../components/LinkDivider";
const FooterNavLinks: React.FC = () => {
  return (
    <ul className="navbar-nav flex-grow">
      <NavItem className="blog-header d-flex flex-row gap-3">
        <NavLink className="p-0" tag={Link} to="/">
          Home
        </NavLink>
        <LinkDivider dividerColor="secondary" />
        <NavLink className="p-0" tag={Link} to="/blog/posts">
          Posts
        </NavLink>
      </NavItem>
    </ul>
  );
};

export default FooterNavLinks;
