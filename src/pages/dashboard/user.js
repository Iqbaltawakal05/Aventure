import React, { useState, useEffect } from 'react';
import { fetchAllUserData, updateUserRole } from '@/API/UserAPI';
import DashboardLayout from '@/Components/DashboardLayout';


export default function User() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllUserData();
            setUserData(data);
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
            <div className="text-center">
                <div>
                    <h1>User</h1>
                    <div className="alluser row">
                            <div className='col-2'>
                                <p>profile</p>
                            </div>
                            <div className="col-1">
                                <p>name</p>
                            </div>
                            <div className='col-3'>
                            <p>email</p>
                            </div>
                            <div className='col-2'>
                            <p>role</p>
                            </div>
                            <div className='col-3'>
                            <p>action</p>
                            </div>
                        </div>
                     {userData && userData.data && userData.data.map((user, index) => (
                        <div className="alluser row" key={index}>
                            <div className='col-2'>
                                <img src={user.profilePictureUrl} alt={`${user.name} profile`}/>
                            </div>
                            <div className="col-1">
                                <p>{user.name}</p>
                            </div>
                            <div className='col-3'>
                            <p>{user.email}</p>
                            </div>
                            <div className='col-2'>
                            <p>{user.role}</p>
                            </div>
                            <div className='col-3'>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id={`dropdownMenuButton-${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                                        Edit role
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${index}`}>
                                        <li><button className="dropdown-item" onClick={() => handleEditClick(user.id, 'admin')} disabled={user.role === 'admin'}>Admin</button></li>
                                        <li><button className="dropdown-item" onClick={() => handleEditClick(user.id, 'user')} disabled={user.role === 'user'}>User</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}