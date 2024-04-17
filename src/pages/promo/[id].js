import { fetchPromoById } from "@/API/PromoAPI";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;

    const [promo, setPromo] = useState({});

    useEffect(() => {
        if (id) {
            fetchPromoById(id).then((data) => {
                setPromo(data);
            });
        }
    }, [id]);

    return (
        <div>
            {promo && (
                <>
                    <img src={promo.imageUrl} alt={promo.title} />
                    <h1>{promo.title}</h1>
                    <p>{promo.description}</p>
                    <p>{promo.minimum_claim_price}</p>
                    <p>{promo.promo_code}</p>
                    <p>{promo.promo_discount_price}</p>
                    <p>{promo.terms_condition}</p>
                    <Link href={`/`}>
                    <button>Back</button>
                    </Link>
                </>
            )}
        </div>
    );
}
