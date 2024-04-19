import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category() {
    const [category, setCategory] = useState([]);

    useEffect (() => {
        async function fetchData() {
            const data = await fetchAllCategoriesData();
            setCategory(data);
        }
        fetchData();

    })
    return (
        <DashboardLayout>
            <div className="text-center">
                <Link href="/dashboard/category/create">
                <button>Create</button>
                </Link>
                {category && category.map((category, index) => (
                    <div className="row" key={index}>
                        <img src={category.imageUrl} alt={category.name} />
                        <p>{category.name}</p>
                        <div>
                            <Link href={`/dashboard/category/${category.id}`} passHref>
                                <button type="button" className="btn btn-primary">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}