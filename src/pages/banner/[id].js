import { fetchBannerById } from "@/API/BannerAPI";
import Layout from "@/Components/Layout";
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
                    <div className="back-buttonid">
                            <div className="d-flex gap-3">
                                <a href="/"><i class="bi bi-chevron-left"></i></a>
                                <div>
                                    <a href="/">{banner.name}</a>
                                </div>
                            </div>
                    </div>
                    <div className='imageActivityId'>
                        <img src={banner.imageUrl} alt={banner.name} />
                    </div>
                </Layout>
            )}
        </div>
    );
}
