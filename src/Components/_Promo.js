import { fetchAllPromoData } from "@/API/PromoAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Promo() {
    const [promos, setPromos] = useState([]);

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
                const data = await fetchAllPromoData();
                setPromos(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='offers container'>
        <div className="title-promo">
        <h1>Promos</h1>
        <a href='/promo' className='view-more'>view more</a>
        </div>
            <Slider {...settings}>
            {promos.map((promo, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={promo.id}>
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="img-promos col-md-6">
                            <img src={promo.imageUrl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-6">
                            <div className="card-promos card-body">
                                <h5 className="card-title">{promo.title}</h5>
                                <p className="card-text">gunakan code <div className="code-promo fw-bold">{promo.promo_code}</div></p>
                                <Link href={`/promo/${promo.id}`}><button className="detail-button">Detail</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </Slider>
          </div>
    )
}