import { LoginData } from "@/API/AuthAPI";
import React, { useState, useEffect } from "react";
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

    const handleBack = () => {
        window.location.href = "/";
    };

    return (
        <div className="login-page">
            <div className="login-header">
                <img src='/gg.jpg' alt="login icon"/>
            </div>
            <div className="login-body">
                <div className="login-container">
                    <img src='/authIcon.svg' alt="login icon"/>
                <form className="login-form needs-validation" onSubmit={handleSubmit} noValidate>
                    <h1>Login</h1>
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit" className="login-btn">Login</button>
                    <button type="submit" className="back-btn" onClick={handleBack}>Back</button>
                    <div className="link-register">
                        <p>Don't have an account?</p>
                            <a href="/auth/register">register</a>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}