import { fetchAllPromoData } from "@/API/PromoAPI";
import { useEffect, useState } from "react";

export default function Promo() {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        fetchAllPromoData().then((data) => {
            setPromos(data);
        });
    }, []);

    if (!promos) {
        return null;
    }

    return (
        <div>
            {promos.map((promo) => (
                <div key={promo.id}>
                    <h1>{promo.title}</h1>
                    <p>{promo.description}</p>
                </div>
            ))}
        </div>
    )
}