import React, { useEffect, useState } from 'react';
import { loggedUserData } from '@/API/UserAPI';

function DashNav() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userDataResponse = await loggedUserData();
                setUserData(userDataResponse);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

    return (
        <div>
            {userData && (
                <div>
                    <img src={userData.profilePictureUrl} alt="profile picture" />
                    <h1>{userData.name}</h1>
                </div>
            )}
        </div>
    );
}

export default DashNav;
