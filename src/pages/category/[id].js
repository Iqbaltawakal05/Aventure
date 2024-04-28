import { fetchCategoryById } from "@/API/CategoryAPI";
import { fetchActivityByCategoryId } from "@/API/ActivityAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CategoryDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const categoryData = await fetchCategoryById(id);
                setCategory(categoryData);

                const activitiesData = await fetchActivityByCategoryId(id);
                setActivities(activitiesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    const formatPrice = (price) => {
        let priceString = price.toString();
        let priceArray = priceString.split('');
        let formattedPrice = '';

        for (let i = 0; i < priceArray.length; i++) {
            if ((priceArray.length - i) % 3 === 0 && i !== 0) {
                formattedPrice += '.';
            }
            formattedPrice += priceArray[i];
        }

        formattedPrice = 'Rp ' + formattedPrice;

        return formattedPrice;
    };

    return (
        <div>
            {category && (
                <Layout>
                    <div className="container">
                        <div className="back-button">
                            <a href="/category"><i class="bi bi-chevron-left"></i></a>
                            <a href="/category">{category.name}</a>
                        </div>
                        {activities.length > 0 ? (
                            <div className="row">
                                {activities.map(activity => (
                                    <div className="col-md-4" key={activity.id}>
                                        <div className="mb-4">
                                            <img src={activity.imageUrls} className="card-img" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{activity.title}</h5>
                                                <div className="location-vacations">
                                                    <p className="city-vacations">{activity.city}</p>
                                                    <p className="province-vacations">{activity.province}</p>
                                                </div>
                                                <div className="price">
                                                    <p className="original-price">{formatPrice(activity.price)}</p>
                                                    <p className="discounted-price">{formatPrice(activity.price_discount)}</p>
                                                </div>
                                            </div>
                                            <Link href={`/activity/${activity.id}`}><button className="activitys-button">See Detail</button></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No vacation content available for this category.</p>
                        )}
                    </div>
                </Layout>
            )}
            </div>
    );
}
