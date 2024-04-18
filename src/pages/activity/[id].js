import { fetchActivityById } from "@/API/ActivityAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [Activity, setActivity] = useState({});

    useEffect(() => {
        if (id) {
            fetchActivityById(id).then((data) => {
                setActivity(data);
            });
        }

    }, [id]);

    return (
        <div>
            {Activity && (
                <Layout>
                    <img src={Activity.imageUrls} alt={Activity.title} />
                    <h1>{Activity.title}</h1>
                    <Link href={"/activity"}>
                    <button>Back</button>
                    </Link>
                </Layout>
            )}
        </div>
    );
}
