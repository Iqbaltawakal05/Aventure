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
        <>
            {category.map((category, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                    <img
                        src={category.imageUrl}
                        className="d-block w-100"
                        alt={`banner-${index}`}
                    />
                    <p>{category.name}</p>
                    <Link href={`/category/${category.id}`}><button className="category-button">detail</button></Link>
                </div>
            ))}
        </>
    )
}