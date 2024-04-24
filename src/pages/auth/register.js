import React, { useState } from "react";
import { RegisterData } from "@/API/AuthAPI";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        try {
            await RegisterData(name, email, password, passwordRepeat);
            alert("Registration successful! Please log in.");
            window.location.href = "/auth/login";

        } catch (error) {
            console.error("Registration error:", error);
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
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    {/* {!!notif.length && <h5>{notif}</h5>} */}
                    <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Repeat Password" onChange={(e) => setPasswordRepeat(e.target.value)}/>
                    <button type="submit" className="login-btn">Register</button>
                    <button type="submit" className="back-btn" onClick={handleBack}>Back</button>
                    <div className="link-register">
                        <p>Already have an account?</p>
                            <a href="/auth/login">Login</a>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
}