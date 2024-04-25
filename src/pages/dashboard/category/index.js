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
                <div className='form-selecttt'>
                <Link href="/dashboard/category/create">
                <button>Create</button>
                </Link>
                </div>
                <div className="row">
                {category.map((category) => (
                    <div className="col-md-4">
                            <div className="card mb-4">
                            <Link href={`/dashboard/category/${category.id}`}>
                                    <img src={category.imageUrl} className="card-img" alt="..." />
                            </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    )
}