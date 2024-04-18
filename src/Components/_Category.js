import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category() {
    const [category, setCategory] = useState([]);

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
        <section className="topDes container">
            <p>Top Vacation Destinations</p>
            <div className="card-group gap-3">
            {category.map((category, index) => (
                <div className="card" key={category.id}>
                    <img src={category.imageUrl} alt={category.name} />
                    <p>{category.name}</p>
                    <Link href={`/category/${category.id}`}><button className="category-button">detail</button></Link>
                </div>
            ))}
            </div>
        </section>
    )
}