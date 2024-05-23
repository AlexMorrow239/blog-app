import React from "react";
import PropTypes from "prop-types";
import "./index.css";

export default function Subheading ({subHeading}) {
    return <p className="page-subtitle">{subHeading}</p>;
}

Subheading.prototype = {
    subHeading: PropTypes.string.isRequired
}