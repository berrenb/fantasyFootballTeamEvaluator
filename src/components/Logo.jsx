import React from "react";
import "../styles/App.css";
import logoSrc from "../resources/images/logo.png";

export default function Logo({ className, style}) {
    return (
        <img src={logoSrc} alt="Draft Logo" className={className} style={style} />
    );
}