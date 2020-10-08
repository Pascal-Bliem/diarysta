import React, { Fragment, useContext } from "react";
import Sidenav from "./Sidenav";
import LanguageMenu from "./LanguageMenu";
import LocaleContext from "../../context/locale/localeContext";

const Navbar = () => {
  const localeContext = useContext(LocaleContext);
  const { translations: t } = localeContext;

  return (
    <Fragment>
      {/* This is the main top navbar */}
      <nav className="green lighten-1">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo" style={{ padding: "0 20px" }}>
            Diarysta - {t.welcome}
          </a>
          <a href="#!" data-target="mobile-sidenav" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul
            className="right hide-on-med-and-down"
            style={{ padding: "0 20px" }}
          >
            <li>
              <a href="sass.html">Sass</a>
            </li>
            <li>
              <a href="badges.html">Components</a>
            </li>
            <li>
              <a href="collapsible.html">Javascript</a>
            </li>
            <li>
              <a
                className="dropdown-trigger"
                href="#!"
                data-target="dropdown-locale-nav"
              >
                Language<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
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
