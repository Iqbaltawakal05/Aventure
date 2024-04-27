import React, { useState, useEffect } from 'react';
import { fetchAllUserData, updateUserRole } from '@/API/UserAPI';
import DashboardLayout from '@/Components/DashboardLayout';

export default function User() {
    const [userData, setUserData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 6;
    const totalPages = userData ? Math.ceil(userData.data.length / cardsPerPage) : 0;
    const pageNumbers = [];

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const handleEditClick = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            const updatedData = await fetchAllUserData();
            setUserData(updatedData);
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <DashboardLayout>
            <div className="row">
                {userData && userData.data && userData.data.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((user, index) => (
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

            {/* Paginations */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={prevPage}>Prev</button>
                    </li>
                    {pageNumbers.map((number, index) => {
                        if (number === 1 || number === totalPages || (number >= currentPage - 1 && number <= currentPage + 1)) {
                            return (
                                <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handleClick(number)}>{number}</button>
                                </li>
                            );
                        } else if (number === currentPage - 2 || number === currentPage + 2) {
                            return (
                                <li key={index} className="page-item">
                                    <button className="page-link">...</button>
                                </li>
                            );
                        }
                        return null;
                    })}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={nextPage}>Next</button>
                    </li>
                </ul>
            </nav>
        </DashboardLayout>
    );
}
