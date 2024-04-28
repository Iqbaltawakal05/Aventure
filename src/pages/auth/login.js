import { LoginData } from "@/API/AuthAPI";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { showNotification, hideNotification } from '@/slice/notifSlice';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
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

        if (!email || !password) {
            setLoading(false);
            dispatch(showNotification('Please fill in all fields.'));
            return;
        }

        try {
            await LoginData(email, password);
            setLoading(false);
            if(localStorage.getItem("token")) {
                dispatch(showNotification('Login successful'));
                setTimeout(() => {
                    window.location.href = "/dashboard/user";
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.response && error.response.data && error.response.data.message) {
                    dispatch(showNotification(error.response.data.message));
            } else {
                dispatch(showNotification('Login failed. Please try again.'));
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        window.location.href = "/";
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
                    <form className="login-form needs-validation" onSubmit={handleSubmit} noValidate>
                        <h1>Login</h1>
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
                        <button type="submit" className="login-btn" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                        <button type="button" className="back-btn" onClick={handleBack}>Back</button>
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
