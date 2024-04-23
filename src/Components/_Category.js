import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Category() {
    const [category, setCategory] = useState([]);

    var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
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
                const data = await fetchAllCategoriesData();
                setCategory(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="Country container">
            <div className="Country-title">
            <h1>Category</h1>
            <a href='/category' className='view-more'>view more</a>
            </div>
            <Slider {...settings}>
             {category.map((category, index) => (
                <div className="card-country" key={category.id}>
                    <Link href={`/category/${category.id}`}>
                    <img src={category.imageUrl} alt={category.name} />
                    </Link>
                    <p>{category.name}</p>
                </div>
            ))}
            </Slider>
        </section>
    )
}