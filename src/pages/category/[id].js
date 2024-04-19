import { fetchCategoryById } from "@/API/CategoryAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});

    useEffect(() => {
        async function fetchBanner() {
            try {
                const categoryData = await fetchCategoryById(id);
                setCategory(categoryData);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        if (id) {
            fetchBanner();
        }
    }, [id]);

    return (
        <div>
            {category && (
                <Layout>
                    <img src={category.imageUrl} alt={category.name} />
                    <h1>{category.name}</h1>
                    <Link href={"/category"}>
                    <button>Back</button>
                    </Link>
                </Layout>
            )}
        </div>
    );
}
