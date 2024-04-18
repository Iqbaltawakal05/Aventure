import { fetchAllCategoriesData } from "@/API/CategoryAPI";
import { useState } from "react";

export default function Activity({ activity }) {
    const [Category, setCategory] = useState([]);

     useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllCategoriesData();
                setCategory(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="card mb-8">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={Category.imageUrl} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{Category.name}</h5>
                        <Link href={`/activity/${activity.id}`}><button className="detail-button">Detail</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}