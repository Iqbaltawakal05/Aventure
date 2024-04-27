import React, { useState, useEffect } from 'react';
import { fetchAllUserData, updateUserRole } from '@/API/UserAPI';
import DashboardLayout from '@/Components/DashboardLayout';

export default function User() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchAllUserData();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
    }, []);

    const handleEditClick = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            const updatedData = await fetchAllUserData();
            setUserData(updatedData);
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    return (
        <DashboardLayout>
            <div className="row">
                {userData && userData.data && userData.data.map((user, index) => (
                    <div className="col-md-4" key={user.id}>
                        <div className="card mb-4 mt-5">
                            <img src={user.profilePictureUrl} className="card-img" alt={`${user.name} profile`} />
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <div className="location-vacations">
                                    <p className="city-vacations">{user.email}</p>
                                    <p className="province-vacations">{user.role}</p>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-success dropdown-toggle" type="button" id={`dropdownMenuButton-${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                                        Edit role
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                        <li><button className="dropdown-item" onClick={() => handleEditClick(user.id, 'admin')} disabled={user.role === 'admin'}>Admin</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleEditClick(user.id, 'user')} disabled={user.role === 'user'}>User</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}
