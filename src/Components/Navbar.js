import React, { useState } from "react";

export default function Navbar() {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <nav className='navbar navbar-expand-lg' id="navbar">
            <div className="container">
                <a className="navbar-brand" href="/">Aventure</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded={!collapsed ? "true" : "false"}
                    aria-label="Toggle navigation"
                    onClick={toggleNavbar}
                >
                    <span className="toggle"><i className="bi bi-list"></i></span>
                </button>

                <div className={`collapse navbar-collapse ${!collapsed ? "show" : ""}`} id="navbarSupportedContent">
                    <div className="additional-info">
                        <a href="/category">Category</a>
                        <a href="/promo">Promo</a>
                        <a href="/activity">Vacations</a>
                    </div>
                    <div className="auth-nav">
                        <a href='/auth/login' className="nav-link nav-login">Login</a>
                        <a href='/auth/register' className="nav-link nav-register">Register</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
