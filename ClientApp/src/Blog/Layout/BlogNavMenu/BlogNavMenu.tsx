import React, { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./BlogNavMenu.css";

const BlogNavMenu = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3 p-4 own-bg-secondary" container>
        <NavbarBrand className="blog-header fs-900 own-text-primary" tag={Link} to="/">
          Blog
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
          <ul className="navbar-nav flex-grow fs-700 ">
            <NavItem className="blog-header d-flex">
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
              <NavLink tag={Link} to="/blog/posts">
                Posts
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default BlogNavMenu;
