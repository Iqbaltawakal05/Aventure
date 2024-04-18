import { fetchCategoryById } from "@/API/CategoryAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});

    useEffect(() => {
        if (id) {
            fetchCategoryById(id).then((data) => {
                setCategory(data);
            });
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
