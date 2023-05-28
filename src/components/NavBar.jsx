import React from "react";
import {useNavigate} from "react-router-dom";
import Logo from "./Logo";

// TODO: Fix this up to look nicer or determine if we want a nav bar
export default function NavBar() {
    const navigate = useNavigate();

    const logoStyle = {
        height: "50px",
        marginTop: "20px",
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Logo className="mb-4" style={logoStyle} />
                        Home
                </a>
            </div>
        </nav>
    )
}