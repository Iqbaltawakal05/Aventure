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
            <div className="text-center">
                <Link href="/dashboard/banner/create">
                <button>Create</button>
                </Link>
                {banner && banner.map((banner, index) => (
                    <div className="row" key={index}>
                        <img src={banner.imageUrl} alt={banner.name} />
                        <p>{banner.name}</p>
                        <div>
                            <Link href={`/dashboard/banner/${banner.id}`} passHref>
                                <button type="button" className="btn btn-primary">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}