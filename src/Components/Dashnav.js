import React, { useEffect, useState } from 'react';
import { loggedUserData } from '@/API/UserAPI';

export default function DashNav() {
    const [loggeduser, setloggeduser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const LoggedUser = await loggedUserData();
                setloggeduser(LoggedUser);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        
        fetchData();
    }, []);

    return (
        <div className='prolifenavb'>
            {loggeduser && (
                <div className='profileNav'>
                    <img src={loggeduser.profilePictureUrl} alt="profile picture" />
                    <a href='/profile'>{loggeduser.name}</a>
                </div>
            )}
        </div>
    );
}
