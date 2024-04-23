import { LogoutData } from "@/API/AuthAPI";
import React, { useEffect, useState } from "react";

export default function Dashboardnavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activePage, setActivePage] = useState("");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userDataResponse = await loggedUserData();
                setUserData(userDataResponse);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

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
                <button className="nav-link" onClick={handleLogout}>Logout</button>
        </div>
    );
}
