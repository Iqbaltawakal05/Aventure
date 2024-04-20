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
            <section className="container">
                <div className="back-button">
                    <a href="/"><i class="bi bi-chevron-left"></i></a>
                    <a href="/">Country</a>
                </div>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-md-4">
                            <div className="card mb-4">
                            <Link href={`/category/${category.id}`}>
                                    <img src={category.imageUrl} className="card-img" alt="..." />
                            </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
            </section>
        </Layout>
    )
}