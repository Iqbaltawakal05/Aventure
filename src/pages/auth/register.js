import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RegisterData } from "@/API/AuthAPI";
import { showNotification, hideNotification } from '@/slice/notifSlice';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { isVisible, message } = useSelector((state) => state.notification);

    useEffect(() => {
        if (isVisible) {
                setModalVisible(true);
        }
    }, [isVisible]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== passwordRepeat) {
            dispatch(showNotification("Passwords do not match"));
            return;
        }

        try {
            await RegisterData(name, email, password, passwordRepeat);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            dispatch(showNotification('Login successful'));
            window.location.href = "/auth/login";
        } catch (error) {
            console.error("Registration error:", error);
            setLoading(false);
             if (error.response.data.message) {
                dispatch(showNotification(error.response.data.message));
            } else {
                dispatch(showNotification('Registration failed'));
            }
        }
    };

    const handleBack = () => {
        window.location.href = "/";
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

     const toggleRepeatPasswordVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

     const handleCloseNotification = () => {
        dispatch(hideNotification()); 
        setModalVisible(false);
    };

    useEffect(() => {
        if (isVisible) {
            setTimeout(() => {
                handleCloseNotification();
            }, 5000);
        }
    }, [isVisible]);

    return (
        <div className="login-page">
            <div className="login-header">
                <img src='/gg.jpg' alt="login icon"/>
            </div>
            {isVisible && (
                <div className="modal" role="dialog" aria-labelledby="notificationModal" style={{ display: modalVisible ? 'block' : 'none' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={handleCloseNotification} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h4 className='text-center'>{message}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="login-body">
                <div className="login-container">
                    <img src='/authIcon.svg' alt="login icon"/>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h1>Register</h1>
                        <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                        <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                            </button>
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                placeholder="Repeat Password"
                                value={passwordRepeat}
                                onChange={(e) => setPasswordRepeat(e.target.value)}
                            />
                            <button type="button" className="repeatpassword-toggle" onClick={toggleRepeatPasswordVisibility}>
                                {showRepeatPassword ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                            </button>
                        <button type="submit" className="login-btn">Register</button>
                        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
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