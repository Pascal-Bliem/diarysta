import React, { Fragment } from "react";
import Sidenav from "./Sidenav";
import LanguageMenu from "./LanguageMenu";
import NavLinks from "./NavLinks";

const Navbar = () => {

  return (
    <Fragment>
      <div class="navbar-fixed">
        {/* This is the main top navbar */}
        <nav className="green lighten-1">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo" style={{ padding: "0 20px" }}>
              Diarysta
          </a>
            <a href="#!" data-target="mobile-sidenav" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul
              className="right hide-on-med-and-down"
              style={{ padding: "0 20px" }}
            >
              <NavLinks dropdownTarget="dropdown-locale-nav" />
            </ul>
          </div>
        </nav>
      </div>
      {/* This is the side-nav for medium and small devices */}
      <Sidenav id="mobile-sidenav" />
      {/* This is the language dropdown for the navbar */}
      <LanguageMenu id="dropdown-locale-nav" />
      {/* This is the language dropdown for the side-nav */}
      <LanguageMenu id="dropdown-locale-sidenav" />
    </Fragment>
  );
};

export default Navbar;
