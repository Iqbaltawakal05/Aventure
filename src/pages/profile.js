import { useEffect, useState } from "react";
import { loggedUserData } from '@/API/UserAPI';

export default function profile() {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const LoggedUser = await loggedUserData();
                setLoggedUser(LoggedUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

    return (
        <div>
            {loggedUser && (
                <div>
                    <h1>{loggedUser.name}</h1>
                    <p>{loggedUser.email}</p>
                    <img src={loggedUser.profilePictureUrl} alt={loggedUser.name} />
                    <p>{loggedUser.role}</p>
                    <p>{loggedUser.phoneNumber}</p>
                    <button>Edit</button>
                </div>
            )}
        </div>
    )
}