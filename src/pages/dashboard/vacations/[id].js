import { deleteActivity, fetchActivityById, updateActivity } from "@/API/ActivityAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UploadImg } from "@/API/UploadImgAPI";
import { fetchAllCategoriesData } from "@/API/CategoryAPI";

export default function VacationDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [vacations, setVacations] = useState({});
    const [editedVacations, setEditedVacations] = useState({});
    const [categories, setCategories] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
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

        fetchAllCategoriesData().then((data) => {
            setCategories(data);
        });
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
            if(imageFile) {
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
        } else {
            const VacationsData = {
                title: editedVacations.title,
                description: editedVacations.description,
                imageUrls: editedVacations.imageUrls,
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
        }
        setSuccessMessage("Vacations updated successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.reload();
            }, 2000);
        } catch (error) {
            console.error("Error updating vacations:", error);
        }
    };

    const handleDelete = async () => {
        try {
                await deleteActivity(id);
                setSuccessMessage("vacations deleted successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.push('/dashboard/vacations');
            }, 2000);
        } catch (error) {
            console.error("Error deleting vacations:", error);
        }
    };

    const formatPrice = (price) => {
    if (typeof price !== 'undefined') {
        let priceString = price.toString();
        let priceArray = priceString.split('');
        let formattedPrice = '';

        for (let i = 0; i < priceArray.length; i++) {
            if ((priceArray.length - i) % 3 === 0 && i !== 0) {
                formattedPrice += '.';
            }
            formattedPrice += priceArray[i];
        }

        formattedPrice = 'Rp ' + formattedPrice;

        return formattedPrice;
    } else {
        return 'Rp 0';
    }
    };

    return (
        <DashboardLayout>
            <div className="back-buttonid">
                        <div className="d-flex gap-3">
                            <a href="/dashboard/vacations"><i class="bi bi-chevron-left"></i></a>
                            <div>
                                <a href="/dashboard/vacations">{vacations.title}</a>
                            <div className="location-vacations">
                                <p className="city-vacations">{vacations.city}</p>
                                <p className="province-vacations">{vacations.province}</p>
                            </div>
                            </div>
                        </div>
                        <div className="ratingActivity">
                            <button type="button" className="btn btn-edit" onClick={() => setShowModalEdit(true)}>
                                Edit Vacations
                            </button>
                            <button type="button" className="btn btn-delete" onClick={() => setShowModalDelete(true)}>
                                Delete
                            </button>
                        </div>
                    </div>
                        <div className='row'>
                            <div className='imageActivityId col-md-7'>
                                <img src={vacations.imageUrls} alt={vacations.title} />
                            </div>
                            <div className='col-md-5'>
                                <p className="rating-vacations">{vacations.rating} <i className="bi bi-star-fill"></i> / {vacations.total_reviews} reviews</p>
                        <div className="locationn">
                                <div className="locationn d-flex gap-4 col-md-8">
                                <i class="bi bi-geo-alt-fill"></i> 
                                <p>{vacations.address}</p>
                                </div>
                            <div className="locations" dangerouslySetInnerHTML={{ __html: vacations.location_maps }} />
                        </div>
                        </div>
                        <div className="row prices">
                            <div className='col-md-6'>
                                    <div className="bodyActivityId">
                                    <h3>Normal price</h3>
                                    <div className="d-flex original-prices">
                                    <h5>{formatPrice(vacations.price)}</h5>
                                    <h5>/person</h5>
                                    </div>
                                </div>
                                <div className="bodyActivityId">
                                    <h3>Discount price</h3>
                                    <div className="d-flex discount-prices">
                                    <h5>{formatPrice(vacations.price_discount)}</h5>
                                    <h5>/person</h5>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='bodyActivityId'>
                                    <h3>Description</h3>
                                    <h5>{vacations.description}</h5>
                                    <h3>Included</h3>
                                    <h5>{vacations.facilities}</h5>
                                </div>
                            </div>
                    </div>
                    </div>

             {/* Edit Modal */}
            <div className={`modal ${showModalEdit ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Promo</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body text-center">
                                <div className="row">
                                <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={editedVacations.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={editedVacations.description} onChange={handleInputChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Terms & Conditions</label>
                                    <textarea className="form-control" name="terms_condition" value={editedVacations.terms_condition} onChange={handleInputChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Facilities</label>
                                    <textarea className="form-control" name="facilities" value={editedVacations.facilities} onChange={handleInputChange}></textarea>
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="mb-3">
                                            <label className="form-label">Price</label>
                                            <input type="number" className="form-control" name="price" value={editedVacations.price} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Discount Price</label>
                                            <input type="number" className="form-control" name="price_discount" value={editedVacations.price_discount} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <select className="form-select" name="categoryId" onChange={handleInputChange}>
                                                <option value="">Select category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Rating</label>
                                            <input type="number" className="form-control" name="rating" value={editedVacations.rating} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Total Reviews</label>
                                            <input type="number" className="form-control" name="total_reviews" value={editedVacations.total_reviews} onChange={handleInputChange} />
                                        </div>
                                </div>
                                <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" name="address" value={editedVacations.address} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Province</label>
                                            <input type="text" className="form-control" name="province" value={editedVacations.province} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" name="city" value={editedVacations.city} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Location Maps</label>
                                            <input type="text" className="form-control" name="location_maps" value={editedVacations.location_maps} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" name="imageUrls" onChange={handleInputChange} />
                                            {editedVacations.imageUrls && <img src={editedVacations.imageUrls} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
                                        </div>
                                </div>
                                </div>
                                {successMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn Create">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <div className={`modal ${showModalDelete ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Confirmation</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalDelete(false)} aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this Vacations?</p>
                        </div>
                        {successMessage && (
                            <div className="alert alert-success" role="alert">
                                {successMessage}
                            </div>
                        )}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModalDelete(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

