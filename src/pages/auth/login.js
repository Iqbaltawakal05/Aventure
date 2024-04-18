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
        <div className="login-page">
            <div className="login-header">
                <img src='/wave.svg' alt="login icon"/>
            </div>
            <div className="login-body">
                <div className="login-container">
                    <img src='/authIcon.svg' alt="login icon"/>
                    <div className="login-form">
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
            </div>
        </div>
    );
}