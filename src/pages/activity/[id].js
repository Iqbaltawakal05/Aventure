import { fetchActivityById } from "@/API/ActivityAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivityDetail() {
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
                    <p>{Activity.description}</p>
                    <p>{Activity.price}</p>
                    <p>{Activity.price_discount}</p>
                    <p>{Activity.rating}</p>
                    <p>{Activity.total_reviews}</p>
                    <p>{Activity.facilities}</p>
                    <p>{Activity.address}</p>
                    <p>{Activity.province}</p>
                    <p>{Activity.city}</p>
                    <div dangerouslySetInnerHTML={{ __html: Activity.location_maps }} />
                    <Link href={"/activity"}>
                    <button>Back</button>
                    </Link>
                </Layout>
            )}
        </div>
    );
}
