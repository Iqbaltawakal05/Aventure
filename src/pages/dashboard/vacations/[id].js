import { fetchActivityById, updateActivity } from "@/API/ActivityAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VacationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [vacations, setVacations] = useState([]);
    const [editedVacations, setEditedVacations] = useState({});

    useEffect (() => {
        async function fetchData() {
            const activityData = await fetchActivityById(id);
            setVacations(activityData);
            setEditedVacations(activityData);
        }
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedVacations({ ...editedVacations, [name]: name === 'price' || name === 'price_discount' ? parseFloat(value) : value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateActivity(id, editedVacations);
            router.push('/dashboard/vacations', '/');
            router.reload()
        } catch (error) {
            console.error("Error updating vacations:", error);
        }
    };

    const handleInputChangeArray = (e, index) => {
    const { name, value } = e.target;
    const updatedUrls = [...editedVacations.imageUrls];
    updatedUrls[index] = value;
    setEditedVacations({ ...editedVacations, [name]: updatedUrls });
    };

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={vacations.imageUrls} />
                <p>{vacations.title}</p>
                <p>{vacations.city}</p>
                <p>{vacations.province}</p>
                <p>{vacations.description}</p>
                <p>{vacations.address}</p>
                <p>{vacations.facilities}</p>
                <p>{vacations.price}</p>
                <p>{vacations.price_discount}</p>
                <p>{vacations.rating}</p>
                <p>{vacations.total_reviews}</p>
                <div dangerouslySetInnerHTML={{ __html: vacations.location_maps }} />
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Vacations
                </button>
                <button type="button" className="btn btn-danger">Delete</button>
            </div>

             {/* modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit promo</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {editedVacations.imageUrls && (
                                    editedVacations.imageUrls.map((url, index) => (
                                        <div key={index}>
                                            <label>Image {index + 1}:
                                                <input
                                                    type="text"
                                                    name={`imageUrls`}
                                                    value={editedVacations.imageUrls[index]}
                                                    onChange={(e) => handleInputChangeArray(e, index)}
                                                />
                                            </label>
                                        </div>
                                    ))
                                )}
                                <label>Title:
                                    <input type="text" name="title" value={editedVacations.title} onChange={handleInputChange} />
                                </label>
                                <label>City:
                                    <input type="text" name="city" value={editedVacations.city} onChange={handleInputChange} />
                                </label>
                                <label>Province:
                                    <input type="text" name="province" value={editedVacations.province} onChange={handleInputChange} />
                                </label>
                                <label>Description:
                                    <input type="text" name="description" value={editedVacations.description} onChange={handleInputChange} />
                                </label>
                                <label>Address:
                                    <input type="text" name="address" value={editedVacations.address} onChange={handleInputChange} />
                                </label>
                                <label>Facilities:
                                    <input type="text" name="facilities" value={editedVacations.facilities} onChange={handleInputChange} />
                                </label>
                                <label>Price:
                                    <input type="number" name="price" value={editedVacations.price} onChange={handleInputChange} />
                                </label>
                                <label>Discount:
                                    <input type="number" name="price_discount" value={editedVacations.price_discount} onChange={handleInputChange} />
                                </label>
                                <label>Rating:
                                    <input type="number" name="rating" value={editedVacations.rating} onChange={handleInputChange} />
                                </label>
                                <label>totalReviews:
                                    <input type="number" name="total_reviews" value={editedVacations.total_reviews} onChange={handleInputChange} />
                                </label>
                                <label>locationMaps:
                                    <input type="text" name="location_maps" value={editedVacations.location_maps} onChange={handleInputChange} />
                                </label>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}