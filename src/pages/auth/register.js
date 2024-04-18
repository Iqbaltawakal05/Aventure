import React, { useState } from "react";
import { RegisterData } from "@/API/AuthAPI";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordRepeat) {
            setError("Passwords do not match");
            return;
        }
        try {
            await RegisterData(name, email, password, passwordRepeat, setError);
            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Registration error:", error);
            setError(error);
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
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder="Repeat Password" value={passwordRepeat} onChange={(e) => setPasswordRepeat(e.target.value)} />
                            <button type="submit" className="login-btn">Register</button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                        <button type="button" className="back-btn" onClick={() => window.history.back()}>Back</button>
                        <div className="link-register">
                            <p>Already have an account?</p>
                            <a href="/login">Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}