import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { fetchCategoryById } from "@/API/CategoryAPI";


export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState(null);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const bannerData = await fetchCategoryById(id);
                setCategory(bannerData);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        if (id) {
            fetchCategory();
        }
    }, [id]);

    if (!category) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={category.imageUrl} />
                <p>{category.name}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit banner
                </button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </DashboardLayout>
    );
}