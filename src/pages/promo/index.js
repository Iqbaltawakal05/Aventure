import { fetchAllPromoData } from "@/API/PromoAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Promo() {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        fetchAllPromoData().then((data) => {
            setPromos(data);
        });
    }, []);

    return (
        <Layout>
            {promos.map((promo) => (
                <div key={promo.id}>
                    <div className="card mb-8">
                        <div className="row g-0">
                            <div className="img-promos col">
                            <img src={promo.imageUrl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col">
                            <div className="card-promos card-body">
                                <h5 className="card-title">{promo.title}</h5>
                                <p className="card-text">gunakan code <div className="code-promo fw-bold">{promo.promo_code}</div></p>
                                <Link href={`/promo/${promo.id}`}><button className="detail-button">Detail</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    )
}