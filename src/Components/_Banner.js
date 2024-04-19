import { useState, useEffect } from "react";
import { fetchAllBannersData } from "@/API/BannerAPI";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Banner() {
    const [banners, setBanners] = useState([]);

     const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
    };

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
        <section className="banner container">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="slider-container">
                    <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index}>
                            <Link href={`/banner/${banner.id}`}>
                            <img
                                src={banner.imageUrl}
                                className="d-block w-100"
                                alt={`banner-${index}`}
                            />
                            </Link>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}
