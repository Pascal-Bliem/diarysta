import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import flag_en from "../../utils/flags/en.svg";
import flag_de from "../../utils/flags/de.svg";
import flag_id from "../../utils/flags/id.svg";
import LocaleContext from "../../context/locale/localeContext";
import AuthContext from "../../context/auth/authContext";
import EntryContext from "../../context/entry/entryContext";

const NavLinks = ({ dropdownTarget }) => {
  const localeContext = useContext(LocaleContext);
  const { translations: t, locale } = localeContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const entryContext = useContext(EntryContext);
  const { clearEntries } = entryContext;

  // adjust flag to current language
  let curr_flag;
  if (locale === "en") {
    curr_flag = flag_en;
  } else if (locale === "de") {
    curr_flag = flag_de;
  } else if (locale === "id") {
    curr_flag = flag_id;
  }

  const onLogout = () => {
    logout();
    clearEntries();
  };

  // links only visible when authenticated
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/entries">
          <i className="material-icons tiny" style={iconStyle}>
            edit
          </i>{" "}
          {t.entries}
        </Link>
      </li>
      <li>
        <Link to="/calendar">
          <i className="material-icons tiny" style={iconStyle}>
            event
          </i>{" "}
          {t.calendar}
        </Link>
      </li>
      <li>
        <Link to="/stats">
          <i className="material-icons tiny" style={iconStyle}>
            insert_chart
          </i>{" "}
          {t.stats}
        </Link>
      </li>
      <li>
        <Link to="#!" onClick={onLogout}>
          <i className="material-icons tiny" style={iconStyle}>
            power_settings_new
          </i>{" "}
          {t.logout}
        </Link>
      </li>
    </Fragment>
  );

  // links only visible when not authenticated
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">
          <i className="material-icons tiny" style={iconStyle}>
            border_color
          </i>{" "}
          {t.register}
        </Link>
      </li>
      <li>
        <Link to="/login">
          <i className="material-icons tiny" style={iconStyle}>
            lock_open
          </i>{" "}
          {t.login}
        </Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      {isAuthenticated ? authLinks : guestLinks}
      <li>
        <a className="dropdown-trigger" href="#!" data-target={dropdownTarget}>
          <img src={curr_flag} style={flagStyle} alt="" /> {t.language}{" "}
          <i className="material-icons right">arrow_drop_down</i>
        </a>
      </li>
      <li>
        <Link to="/about">
          <i className="material-icons tiny" style={iconStyle}>
            info_outline
          </i>{" "}
          About
        </Link>
      </li>
    </Fragment>
  );
};

NavLinks.propTypes = {
  dropdownTarget: PropTypes.string.isRequired,
};

const flagStyle = {
  width: "20px",
  height: "10px",
  margin: "auto",
  display: "inline",
  float: "left center",
};

const iconStyle = {
  display: "inline-flex",
  verticalAlign: "top",
};

export default NavLinks;
