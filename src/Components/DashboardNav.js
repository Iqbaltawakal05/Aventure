import { LogoutData } from "@/API/AuthAPI";
import React, { useEffect, useState } from "react";
import { loggedUserData } from '@/API/UserAPI';

export default function Dashboardnavbar() {
    const [activePage, setActivePage] = useState("");
    const [loggeduser, setLoggedUser] = useState(null);
    const [showNav, setShowNav] = useState(false); // State untuk menampilkan atau menyembunyikan navbar di perangkat seluler

    useEffect(() => {
        async function fetchData() {
            try {
                const LoggedUser = await loggedUserData();
                setLoggedUser(LoggedUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

    useEffect(() => {
        setActivePage(window.location.pathname);
    }, []);

    const handleLogout = async () => {
        try {
            const res = await LogoutData();
            // Tambahkan penanganan logout di sini jika perlu
        } catch (error) {
            // Tambahkan penanganan error di sini jika perlu
        }
    };

    // Fungsi untuk mengubah status toggle navbar
    const handleClick = () => {
        setShowNav(!showNav);
    };

    return (
        <div className="dassv">
        <div className={`dashnav ${showNav ? 'show' : ''}`}>
            <a className="dashnav-brand navbar-brand disabled" aria-disabled="true">Aven<span>ture</span></a>
            <button className="toggle-button" onClick={handleClick}>
                <i className="bi bi-list"></i>
            </button>
            <div className={`nav-links ${showNav ? 'show' : ''}`}>
                <a className={`dash-link nav-link ${activePage === "/dashboard/user" ? "active" : ""}`} href="/dashboard/user"><i className="bi bi-people-fill"></i> User</a>
                <a className={`dash-link nav-link ${activePage === "/dashboard/banner" ? "active" : ""}`} href="/dashboard/banner"><i className="bi bi-card-heading"></i> Banner</a>
                <a className={`dash-link nav-link ${activePage === "/dashboard/promo" ? "active" : ""}`} href="/dashboard/promo"><i className="bi bi-percent"></i> Promo</a>
                <a className={`dash-link nav-link ${activePage === "/dashboard/category" ? "active" : ""}`} href="/dashboard/category"><i className="bi bi-bookmarks-fill"></i> Category</a>
                <a className={`dash-link nav-link ${activePage === "/dashboard/vacations" ? "active" : ""}`} href="/dashboard/vacations"><i className="bi bi-suitcase-fill"></i> Vacations</a>
                <div className='profiles'>
                    {loggeduser && (
                        <div className='profileNav'>
                            <img src={loggeduser.profilePictureUrl} alt="profile picture" />
                            <a href='/profile'>{loggeduser.name}</a>
                        </div>
                    )}
                    <button onClick={handleLogout}><i className="bi bi-box-arrow-left"></i> Logout</button>
                </div>
            </div>
        </div>
        </div>
    );
}
