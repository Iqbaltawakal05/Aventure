import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Category() {
    const [category, setCategory] = useState([]);

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
            <h1>Country</h1>
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