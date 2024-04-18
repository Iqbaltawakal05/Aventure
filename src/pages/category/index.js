import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchAllCategoriesData().then((data) => {
            setCategories(data);
        });
    }, []);

    return (
        <Layout>
            {categories.map((category) => (
                <div key={category.id}>
                    <div className="card mb-8">
                        <div className="row g-0">
                            <div className="img-promos col">
                            <img src={category.imageUrl} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col">
                            <div className="card-promos card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <Link href={`/category/${category.id}`}><button className="detail-button">Detail</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    )
}