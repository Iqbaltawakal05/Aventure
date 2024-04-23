import { fetchAllActivitiesData } from "@/API/ActivityAPI";
import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import Layout from "@/Components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function category() {
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

     useEffect(() => {
        fetchAllActivitiesData().then((data) => {
            setActivities(data);
        });
        fetchAllCategoriesData().then((data) => {
            setCategories(data);
        });
    }, []);

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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value === "all" ? null : e.target.value);
    };

    const filteredActivities = selectedCategory
        ? activities.filter((activity) => activity.categoryId === selectedCategory)
        : activities;

    return (
        <Layout>
            <section className="container">
                <div className="back-button">
                    <a href="/"><i class="bi bi-chevron-left"></i></a>
                    <a href="/">Vacations</a>
                </div>
                <div className="dropdown mb-3">
                    <select className="form-select" onChange={handleCategoryChange}>
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
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
                        ))
                    ) : (
                        <div className="col-md-12">
                            <p>No activities found</p>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}