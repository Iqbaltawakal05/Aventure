import { LogoutData } from "@/API/AuthAPI";
import React, { useEffect, useState } from "react";
import { loggedUserData } from '@/API/UserAPI';

export default function Dashboardnavbar() {
    const [activePage, setActivePage] = useState("");
    const [loggeduser, setloggeduser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const LoggedUser = await loggedUserData();
                setloggeduser(LoggedUser);
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
        } catch (error) {
        }
    };

    return (
        <div className="dashnav">
            <a className="dashnav-brand navbar-brand disabled" aria-disabled="true">Aven<span>ture</span></a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/user" ? "active" : ""}`} href="/dashboard/user"><i class="bi bi-people-fill"></i> User</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/banner" ? "active" : ""}`} href="/dashboard/banner"><i class="bi bi-card-heading"></i> Banner</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/promo" ? "active" : ""}`} href="/dashboard/promo"><i class="bi bi-percent"></i> Promo</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/category" ? "active" : ""}`} href="/dashboard/category"><i class="bi bi-bookmarks-fill"></i> Category</a>
            <a className={`dash-link nav-link ${activePage === "/dashboard/vacations" ? "active" : ""}`} href="/dashboard/vacations"><i class="bi bi-suitcase-fill"></i> Vacations</a>
            <div className='profiles'>
            {loggeduser && (
                <div className='profileNav'>
                    <img src={loggeduser.profilePictureUrl} alt="profile picture" />
                    <a href='/profile'>{loggeduser.name}</a>
                </div>
            )}
            <button onClick={handleLogout}><i class="bi bi-box-arrow-left"></i> Logout</button>
            </div>
        </div>
    );
}
