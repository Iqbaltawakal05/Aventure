import { fetchAllBannersData } from "@/API/BannerAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner() {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllBannersData();
            setBanner(data);
        }
        fetchData();
    }, []);

    return (
        <DashboardLayout>
                <div className="form-selecttt">
                <Link href="/dashboard/banner/create">
                <button>Create</button>
                </Link>
                </div>
                <div className="row">
                {banner && banner.map((banner, index) => (
                    <div className="col-md-4">
                            <div className="card mb-4">
                            <Link href={`/dashboard/banner/${banner.id}`}>
                                    <img src={banner.imageUrl} className="card-img" alt="..." />
                            </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{banner.name}</h5>
                                </div>
                            </div>
                    </div>
                ))}
                </div>
        </DashboardLayout>
    )
}