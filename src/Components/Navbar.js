
export default function Navbar() {

    return (
        <nav className="container navbar navbar-expand-lg" id="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Aventure</a>
                    <div className="auth-nav">
                        <a href='/auth/login' className="nav-link nav-login">Login</a>
                        <a href='/auth/register' className="nav-link nav-register">Register</a>
                    </div>
            </div>
        </nav>
    )
}