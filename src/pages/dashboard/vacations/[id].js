import { fetchActivityById } from "@/API/ActivityAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VacationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [vacations, setVacations] = useState([]);

    useEffect (() => {
        async function fetchData() {
            const data = await fetchActivityById(id);
            setVacations(data);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={vacations.imageUrls} />
                <p>{vacations.title}</p>
                <p>{vacations.city}</p>
                <p>{vacations.description}</p>
                <p>{vacations.address}</p>
                <p>{vacations.facilities}</p>
                <p>{vacations.price}</p>
                <p>{vacations.price_discount}</p>
                <p>{vacations.rating}</p>
                <p>{vacations.province}</p>
                <p>{vacations.total_reviews}</p>
                <div dangerouslySetInnerHTML={{ __html: vacations.location_maps }} />
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Vacations
                </button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>
        </DashboardLayout>
    )
}