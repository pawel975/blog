import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import "./AdminNavMenu.css";
import combinePathWithAdminRoot from "./utils";
import { adminNavMenuRoutes } from "./AdminNavMenuRoutes";

const AdminNavMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

  /**
   * Update possible routes inside this component
   * {@link adminNavMenuRoutes}
   */
  const NavLinks = adminNavMenuRoutes.map((route) => (
    <NavItem>
      <NavLink
        tag={Link}
        className="text-dark"
        to={combinePathWithAdminRoot(route)}
      >
        {/* Capitalized name of route */}
        {route.slice(0, 1).toUpperCase() + route.slice(1)}
      </NavLink>
    </NavItem>
  ));

  return (
    <header>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      >
        <NavbarBrand tag={Link} to={combinePathWithAdminRoot("dashboard")}>
          Admin Panel
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse
          className="d-sm-inline-flex flex-sm-row-reverse"
          isOpen={!collapsed}
          navbar
        >
          <ul className="navbar-nav flex-grow">{NavLinks}</ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default AdminNavMenu;
