import { useEffect, useState } from "react";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 650;
            setScrolled(isScrolled);
        };

        handleScroll();

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={` navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container">
                <a className="navbar-brand" href="/">Aventure</a>
                    {scrolled && (
                        <div className="additional-info">
                            <a href="/category">Country</a>
                            <a href="/promo">Offer</a>
                            <a href="/activity">Vacations</a>
                        </div>
                    )}
                    <div className="auth-nav">
                        <a href='/auth/login' className="nav-link nav-login">Login</a>
                        <a href='/auth/register' className="nav-link nav-register">Register</a>
                    </div>
            </div>
        </nav>
    )
}