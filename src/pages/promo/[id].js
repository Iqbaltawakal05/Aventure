import { fetchPromoById } from "@/API/PromoAPI";
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
                    <h1>{promo.title}</h1>
                    <p>{promo.description}</p>
                </>
            )}
        </div>
    );
}
