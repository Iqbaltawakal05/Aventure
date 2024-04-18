import { LogoutData } from "@/API/AuthAPI";

export default function Dashboard() {

    const handleLogout = async () => {
        try {
            const res = await LogoutData();
            localStorage.removeItem('token');
            window.location.href = '/';
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Dashboard content here</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}