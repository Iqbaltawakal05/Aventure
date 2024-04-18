import { fetchAllPromoData } from '@/API/PromoAPI';
import { useEffect, useState } from "react";
import Link from 'next/link';
import DashboardLayout from "@/Components/DashboardLayout";

export default function Promo() {
    const [promoData, setPromoData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllPromoData();
            setPromoData(data);
        }
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <div className="text-center">
                <Link href="/dashboard/promo/create">
                <button>Create</button>
                </Link>
                {promoData && promoData.map((promo, index) => (
                    <div className="row" key={index}>
                        <img src={promo.imageUrl} alt={promo.title} />
                        <p>{promo.title}</p>
                        <p>{promo.description}</p>
                        <p>{promo.promo_code}</p>
                        <div>
                            <Link href={`/dashboard/promo/${promo.id}`} passHref>
                                <button type="button" className="btn btn-primary">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
