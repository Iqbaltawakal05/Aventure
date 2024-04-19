import React, { useEffect, useState } from "react";

export default function Dashboardnavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        setActivePage(window.location.pathname);
    }, []);

    const handleLogout = async () => {
        try {
            const res = await LogoutData();
        } catch (error) {
        }
    };

    return (
        <div className="dashnav">
            <a className="dashnav-brand navbar-brand disabled" aria-disabled="true">Aven<span>ture</span></a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/user" ? "active" : ""}`} href="/dashboard/user">User</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/banner" ? "active" : ""}`} href="/dashboard/banner">Banner</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/promo" ? "active" : ""}`} href="/dashboard/promo">Promo</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/category" ? "active" : ""}`} href="/dashboard/category">Category</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/vacations" ? "active" : ""}`} href="/dashboard/vacations">Vacations</a>
            {isLoggedIn ? (
                <button className="nav-link" onClick={handleLogout}>Logout</button>
            ) : (
                <>
                    <a href="/auth/login" className={`nav-link ${activePage === "/auth/login" ? "active" : ""}`}>Login</a>
                    <a href="/auth/register" className={`nav-link ${activePage === "/auth/register" ? "active" : ""}`}>Register</a>
                </>
            )}
        </div>
    );
}
