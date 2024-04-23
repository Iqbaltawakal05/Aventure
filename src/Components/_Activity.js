import { fetchAllActivitiesData } from "@/API/ActivityAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Activity() {
    const [activity, setActivity] = useState([]);

    var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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
                    <img src={activity.imageUrls[0]} alt={activity.name} />
                    <h3 className="title-vacations">{activity.title}</h3>
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