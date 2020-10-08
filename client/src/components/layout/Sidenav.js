import React, { Fragment } from 'react';
import PropTypes from "prop-types";

const Sidenav = ({ id }) => {
    return (
        <Fragment>
            <ul className="sidenav teal lighten-5" id={id}>
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
                        data-target="dropdown-locale-sidenav"
                    >
                        Language<i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
            </ul>
        </Fragment>
    )
}

Sidenav.propTypes = {
    id: PropTypes.string.isRequired,
}

export default Sidenav;
