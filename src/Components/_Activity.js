import { fetchAllActivitiesData } from "@/API/ActivityAPI";

export default function Activity() {
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllActivitiesData();
                setActivity(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        }, []);

    return (
        <section className="topDes container">
            <p>Top Activity</p>
            <div className="card-group gap-3">
            {activity.map((activity, index) => (
                <div className="card" key={activity.id}>
                    <img src={activity.imageUrl} alt={activity.name} />
                    <p>{activity.name}</p>
                    <Link href={`/activity/${activity.id}`}><button className="category-button">detail</button></Link>
                </div>
            ))}
            </div>
        </section>
    )
}