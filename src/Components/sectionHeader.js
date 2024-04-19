export default function SectionHeader() {
    return (
        <section>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/category">Category</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/promo">Promo</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/activity">Vacations</a>
                </li>
            </ul>
        </section>
    )
}