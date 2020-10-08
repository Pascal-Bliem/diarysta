import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import NavLinks from "./NavLinks";

const Sidenav = ({ id }) => {
    return (
        <Fragment>
            <ul className="sidenav teal lighten-5" id={id}>
                <NavLinks dropdownTarget="dropdown-locale-sidenav" />
            </ul>
        </Fragment>
    )
}

Sidenav.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Sidenav;
