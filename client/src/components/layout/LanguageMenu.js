import React, { Fragment, useContext } from 'react'
import PropTypes from "prop-types";
import flag_en from "../../utils/flags/en.svg";
import flag_de from "../../utils/flags/de.svg";
import flag_id from "../../utils/flags/id.svg";
import LocaleContext from "../../context/locale/localeContext";

const LanguageMenu = ({ id }) => {
    const localeContext = useContext(LocaleContext);
    const { changeLocale } = localeContext;

    const changeLanguage = (newLocale) => {
        changeLocale(newLocale);
    };

    return (
        <Fragment>
            <ul id={id} className="dropdown-content">
                <li>
                    <a
                        href="#!"
                        value="en"
                        style={langStyle}
                        onClick={() => changeLanguage("en")}
                    >
                        English <img src={flag_en} style={flagStyle} />
                    </a>
                </li>
                <li>
                    <a
                        href="#!"
                        value="de"
                        style={langStyle}
                        onClick={() => changeLanguage("de")}
                    >
                        Deutsch <img src={flag_de} style={flagStyle} />
                    </a>
                </li>
                <li>
                    <a
                        href="#!"
                        value="id"
                        style={langStyle}
                        onClick={() => changeLanguage("id")}
                    >
                        Bahasa Indonesia <img src={flag_id} style={flagStyle} />
                    </a>
                </li>
            </ul>
        </Fragment>
    )
}

LanguageMenu.propTypes = {
    id: PropTypes.string.isRequired,
}

const langStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const flagStyle = {
    width: "20px",
    margin: "auto",
    display: "inline",
    float: "right",
};

export default LanguageMenu;
