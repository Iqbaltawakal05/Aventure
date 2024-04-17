
export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg" id="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Aven<span className="ture">ture</span></a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/promo">Promo</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a href='/auth/login' className="nav-link">Login</a>
                    </li>
                    <li className="nav-item">
                        <a href='/register' className="nav-link">Register</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}