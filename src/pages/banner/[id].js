import { fetchBannerById } from "@/API/BannerAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BannerDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState({});

    useEffect(() => {
        if (id) {
            fetchBannerById(id).then((data) => {
                setBanner(data);
            });
        }

    }, [id]);

    return (
        <div>
            {banner && (
                <Layout>
                    <img src={banner.imageUrl} alt={banner.name} />
                    <h1>{banner.name}</h1>
                    <Link href={"/"}>
                    <button>Back</button>
                    </Link>
                </Layout>
            )}
        </div>
    );
}
