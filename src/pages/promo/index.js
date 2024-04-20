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
            <section className="container">
                <div className="back-button">
                    <a href="/"><i class="bi bi-chevron-left"></i></a>
                    <a href="/">Promo</a>
                </div>
            <div className="row">
                {promos.map((promo) => (
                    <div className="col-md-4">
                            <div className="mb-4">
                            <Link href={`/promo/${promo.id}`}>
                                    <img src={promo.imageUrl} className="card-img" alt="..." />
                            </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{promo.title}</h5>
                                    <div className='promo-code'>
                                    <p>Use code :</p>
                                    <h5>{promo.promo_code}</h5>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            </section>
        </Layout>
    )
}