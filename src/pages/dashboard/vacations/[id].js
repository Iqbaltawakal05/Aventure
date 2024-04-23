import { deleteActivity, fetchActivityById, updateActivity } from "@/API/ActivityAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UploadImg } from "@/API/UploadImgAPI";

export default function VacationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [vacations, setVacations] = useState({});
    const [editedVacations, setEditedVacations] = useState({});
    const [imageFile, setImageFile] = useState(null);

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
        const { name, value, files } = e.target;
        if (name === "imageUrls") {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEditedVacations({ ...editedVacations, imageUrls: reader.result });
                setImageFile(file);
            };
        } else {
            setEditedVacations({ ...editedVacations, [name]: name === 'price' || name === 'price_discount' ? parseFloat(value) : value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const uploadResponse = await UploadImg(imageFile);
            const imageUrl = uploadResponse.data.url;
            const VacationsData = {
                title: editedVacations.title,
                description: editedVacations.description,
                imageUrls: [imageUrl],
                price: editedVacations.price,
                price_discount: editedVacations.price_discount,
                rating: editedVacations.rating,
                total_reviews: editedVacations.total_reviews,
                facilities: editedVacations.facilities,
                address: editedVacations.address,
                province: editedVacations.province,
                city: editedVacations.city,
                location_maps: editedVacations.location_maps
            };
            await updateActivity(id, VacationsData);
            router.push('/dashboard/vacations', '/');
            router.reload()
        } catch (error) {
            console.error("Error updating vacations:", error);
        }
    };

    const handleDelete = async () => {
        try {
            if (confirm("Are you sure you want to delete this Vacations?")) {
                await deleteActivity(id);
                router.push('/dashboard/vacations', '/');
            }
        } catch (error) {
            console.error("Error deleting vacations:", error);
        }
    };

    return (
        <DashboardLayout>
            <div className="text-center">
                <p>{vacations.title}</p>
                <p>{vacations.description}</p>
                <img src={vacations.imageUrls} />
                <p>{vacations.city}</p>
                <p>{vacations.price}</p>
                <p>{vacations.price_discount}</p>
                <p>{vacations.province}</p>
                <p>{vacations.address}</p>
                <p>{vacations.facilities}</p>
                <p>{vacations.rating}</p>
                <p>{vacations.total_reviews}</p>
                <div dangerouslySetInnerHTML={{ __html: vacations.location_maps }} />
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Vacations
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
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
                                <label>Title:
                                    <input type="text" name="title" value={editedVacations.title} onChange={handleInputChange} />
                                </label>
                                <label>Description:
                                    <input type="text" name="description" value={editedVacations.description} onChange={handleInputChange} />
                                </label>
                                <label>image:
                                    <input type="file" id="imageUrl" name="imageUrls" onChange={handleInputChange} /><br />
                                    {editedVacations.imageUrls && <img src={editedVacations.imageUrls} alt="Preview" style={{ maxWidth: '200px' }} />}
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
                                <label>Facilities:
                                    <input type="text" name="facilities" value={editedVacations.facilities} onChange={handleInputChange} />
                                </label>
                                <label>Address:
                                    <input type="text" name="address" value={editedVacations.address} onChange={handleInputChange} />
                                </label>
                                <label>Province:
                                    <input type="text" name="province" value={editedVacations.province} onChange={handleInputChange} />
                                </label>
                                <label>City:
                                    <input type="text" name="city" value={editedVacations.city} onChange={handleInputChange} />
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

