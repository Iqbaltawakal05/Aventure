import Link from "next/link";

export default function SectionHeader() {
    return (
        <section className="navbar-nav links">
                <div className="links-item">
                    <div className="Country-link">
                        <i className="bi bi-buildings-fill"></i>
                        <a className="Country-links" href="/category">Country</a>
                    </div>
                    <div className="Offer-link">
                        <i className="bi bi-cash-coin"></i>
                        <a className="Offer-links" href="/promo">Offers</a>
                    </div>
                    <div className="Vacations-link">
                        <i className="bi bi-backpack2-fill"></i>
                        <a className="Vacations-links" href="/activity">Vacations</a>
                    </div>
                </div>
        </section>
    )
}