import { useEffect, useState } from "react";
import Link from 'next/link';
import DashboardLayout from "@/Components/DashboardLayout";
import { fetchAllActivitiesData } from "@/API/ActivityAPI";

export default function Vacations() {
    const [vacations, setVacations] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllActivitiesData();
            setVacations(data);
        }
        fetchData();
    }, []);

    return (
        <DashboardLayout>
            <div className="text-center">
                <Link href="/dashboard/vacations/create">
                <button>Create</button>
                </Link>
                {vacations && vacations.map((vacations, index) => (
                    <div className="row" key={index}>
                        <img src={vacations.imageUrls} alt={vacations.title} />
                        <p>{vacations.title}</p>
                        <p>{vacations.description}</p>
                        <div>
                            <Link href={`/dashboard/vacations/${vacations.id}`} passHref>
                                <button type="button" className="btn btn-primary">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
