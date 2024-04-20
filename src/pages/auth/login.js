import { LoginData } from "@/API/AuthAPI";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setNotif } from "@/slice/notifSlice";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await LoginData(email, password);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row">
            <div className="login-icon col-6">
                <img src='https://img.freepik.com/free-photo/view-travel-items-assortment-still-life_23-2149617645.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1713484800&semt=sph' alt="login icon"/>
                <p>let's Adventure</p>
            </div>
            <div className="login-body col-6">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <button type="submit" className="login-btn">Login</button>
                        </form>
                        <button type="button" className="back-btn" onClick={() => window.history.back()}>Back</button>
                        <div className="link-register">
                            <p>Don't have an account?</p>
                            <a href="/auth/register">register</a>
                        </div>
                    </div>
                </div>
    );
}