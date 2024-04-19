import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { fetchBannerById } from "@/API/BannerAPI";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        async function fetchBanner() {
            try {
                const promoData = await fetchBannerById(id);
                setBanner(promoData);
            } catch (error) {
                console.error("Error fetching promo data:", error);
            }
        }

        if (id) {
            fetchBanner();
        }
    }, [id]);

    if (!banner) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={banner.imageUrl} />
                <p>{banner.name}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Promo
                </button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </DashboardLayout>
    );
}