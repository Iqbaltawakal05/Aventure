export default function SectionHeader() {
    return (
        <section className="navbar-nav links">
                <div className="links-item">
                    <a className="Country-links" aria-current="page" href="/category">Country</a>
                    <a className="Offer-links" href="/promo">Offers</a>
                    <a className="Vacations-links" href="/activity">Vacations</a>
                </div>
        </section>
    )
}