import { fetchAllPromoData } from '@/API/PromoAPI';
import { useEffect, useState } from "react";
import Link from 'next/link';
import DashboardLayout from "@/Components/DashboardLayout";

export default function Promo() {
    const [promos, setPromos] = useState([]);

    useEffect(() => {
        fetchAllPromoData().then((data) => {
            setPromos(data);
        });
    }, []);

    return (
        <DashboardLayout>
                <div className='form-selecttt'>
                <Link href="/dashboard/promo/create">
                <button>Create</button>
                </Link>
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
        </DashboardLayout>
    );
}
