import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { fetchPromoById } from '@/API/PromoAPI';
import DashboardLayout from "@/Components/DashboardLayout";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [promo, setPromo] = useState(null);

    useEffect(() => {
        async function fetchPromo() {
            try {
                const promoData = await fetchPromoById(id);
                setPromo(promoData);
            } catch (error) {
                console.error("Error fetching promo data:", error);
            }
        }

        if (id) {
            fetchPromo();
        }
    }, [id]);

    if (!promo) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={promo.imageUrl} />
                <p>{promo.title}</p>
                <p>{promo.description}</p>
                <p>{promo.promo_code}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Promo
                </button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </DashboardLayout>
    );
}