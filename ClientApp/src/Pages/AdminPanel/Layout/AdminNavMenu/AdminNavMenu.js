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

const AdminNavMenu = () => {
  /**
   *
   * @param {string} subPath
   * @returns combined path with root path of /admin-panel/{subpath}
   */
  const combinePathWithAdminRoot = (subPath) => {
    const ADMIN_ROOT_ROUTE = "/admin-panel/";
    return ADMIN_ROOT_ROUTE + subPath;
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(!collapsed);
  };

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
          <ul className="navbar-nav flex-grow">
            <NavItem>
              <NavLink
                tag={Link}
                className="text-dark"
                to={combinePathWithAdminRoot("dashboard")}
              >
                Dashboard
              </NavLink>
            </NavItem>
          </ul>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default AdminNavMenu;
