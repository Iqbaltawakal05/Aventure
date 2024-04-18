import { fetchAllActivitiesData } from "@/API/ActivityAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function category() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchAllActivitiesData().then((data) => {
            setActivities(data);
        });
    }, []);

    return (
        <Layout>
            {activities.map((activity) => (
                <div key={activity.id}>
                    <div className="card mb-8">
                        <div className="row g-0">
                            <div className="img-promos col">
                            <img src={activity.imageUrls} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col">
                            <div className="card-promos card-body">
                                <h5 className="card-title">{activity.title}</h5>
                                <p>{activity.province}</p>
                                <p>{activity.description}</p>
                                <Link href={`/activity/${activity.id}`}><button className="detail-button">Detail</button></Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    )
}