import { fetchAllbannerData } from "@/API/BannerAPI";
import { useState, useEffect } from "react";

export default function Banner() {;
    const [banners, setBanners] = useState([]);

     useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllbannerData();
                setBanners(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, []);

    return (
        <section className="banner">
            {banners.map((banner, index) => (
                <div className="banner-img" key={index}>
                    <img src={banner.imageUrl} alt={`banner-${index}`} />
                </div>
            ))}
        </section>
    )
}