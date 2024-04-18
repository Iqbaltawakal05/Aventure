import { useState, useEffect } from "react";
import { fetchAllBannersData } from "@/API/BannerAPI";
import Link from "next/link";

export default function Banner() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllBannersData();
                setBanners(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="banner">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {banners.map((banner, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <Link href={`/banner/${banner.id}`}>
                            <img
                                src={banner.imageUrl}
                                className="d-block w-100"
                                alt={`banner-${index}`}
                            />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="btn-carousel">
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>
            </div>
        </section>
    );
}
