import { fetchAllActivitiesData } from "@/API/ActivityAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Activity() {
    const [activity, setActivity] = useState([]);

    const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllActivitiesData();
                setActivity(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        }, []);

    const formatPrice = (price) => {
        let priceString = price.toString();
        let priceArray = priceString.split('');
        let formattedPrice = '';

        for (let i = 0; i < priceArray.length; i++) {
            if ((priceArray.length - i) % 3 === 0 && i !== 0) {
                formattedPrice += '.';
            }
            formattedPrice += priceArray[i];
        }

        formattedPrice = 'Rp ' + formattedPrice;

        return formattedPrice;
    };


    return (
        <section className="container">
            <div className="vacations-title">
            <h1>Vacations</h1>
            <a href='/activity' className='view-more'>view more</a>
            </div>
            <Slider {...settings}>
            {activity.map((activity, index) => (
                <div className="card-vacations" key={activity.id}>
                    <img src={activity.imageUrls} alt={activity.name} />
                    <p>{activity.title}</p>
                    <div className="location-vacations">
                    <p className="city-vacations">{activity.city}</p>
                    <p className="province-vacations">{activity.province}</p>
                    </div>
                    <div className="price">
                    <p className="original-price">{formatPrice(activity.price)}</p>
                    <p className="discounted-price">{formatPrice(activity.price_discount)}</p>
                    </div>
                    <Link href={`/activity/${activity.id}`}><button className="activity-button">See Detail</button></Link>
                </div>
            ))}
            </Slider>
        </section>
    )
}