import React, { Fragment, useContext } from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import flag_en from "../../utils/flags/en.svg";
import flag_de from "../../utils/flags/de.svg";
import flag_id from "../../utils/flags/id.svg";
import LocaleContext from "../../context/locale/localeContext";

const NavLinks = ({ dropdownTarget }) => {
    const localeContext = useContext(LocaleContext);
    const { translations: t, locale } = localeContext;

    // adjust flag to current language
    let curr_flag;
    if (locale === "en") {
        curr_flag = flag_en;
    } else if (locale === "de") {
        curr_flag = flag_de;
    } else if (locale === "id") {
        curr_flag = flag_id;
    }

    return (
        <Fragment>
            <li>
                <Link to="/entries">{t.entries}</Link>
            </li>
            <li>
                <Link to="/calendar">{t.calendar}</Link>
            </li>
            <li>
                <Link to="/stats">{t.stats}</Link>
            </li>
            <li>
                <Link to="/register">{t.register}</Link>
            </li>
            <li>
                <Link to="/login">{t.login}</Link>
            </li>
            <li>
                <a
                    className="dropdown-trigger"
                    href="#!"
                    data-target={dropdownTarget}
                >
                    <img src={curr_flag} style={flagStyle} alt="" /> {t.language}  <i className="material-icons right">arrow_drop_down</i>
                </a>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </Fragment>
    )
}

NavLinks.propTypes = {
    dropdownTarget: PropTypes.string.isRequired,
}

const flagStyle = {
    width: "20px",
    height: "10px",
    margin: "auto",
    display: "inline",
    float: "left center",
};

export default NavLinks;
