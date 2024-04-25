import { useEffect, useState } from "react";
import Link from 'next/link';
import DashboardLayout from "@/Components/DashboardLayout";
import { UploadImg } from '@/API/UploadImgAPI';
import { fetchAllActivitiesData, createActivity } from "@/API/ActivityAPI";
import { fetchAllCategoriesData } from "@/API/CategoryAPI";

export default function Vacations() {
    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: '',
        imageUrls: '',
        imageFiles: null,
        price: '',
        price_discount: '',
        rating: '',
        total_reviews: '',
        facilities: '',
        address: '',
        province: '',
        city: '',
        location_maps: ''
    });

    useEffect(() => {
        fetchAllActivitiesData().then((data) => {
            setActivities(data);
        });
        fetchAllCategoriesData().then((data) => {
            setCategories(data);
        });
    }, []);

     const formatPrice = (price) => {
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
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value === "all" ? null : e.target.value);
    };

    const filteredActivities = selectedCategory
        ? activities.filter((activity) => activity.categoryId === selectedCategory)
        : activities;


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageUrls') {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageUrls: reader.result,
                    imageFiles: file
                });
            };
        }
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'price_discount' ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.imageUrls || !formData.price || !formData.price_discount || !formData.rating || !formData.total_reviews || !formData.facilities || !formData.address || !formData.province || !formData.city || !formData.location_maps || !formData.categoryId) {
            setErrorMessage('Semua kolom harus diisi.');
            return;
        }

        try {

            const uploadResponse = await UploadImg(formData.imageFiles);
            const imageUrls = uploadResponse.data.url;
            const activityData = {
                title: formData.title,
                description: formData.description,
                categoryId: formData.categoryId,
                imageUrls: [imageUrls],
                price: formData.price,
                price_discount: formData.price_discount,
                rating: formData.rating,
                total_reviews: formData.total_reviews,
                facilities: formData.facilities,
                address: formData.address,
                province: formData.province,
                city: formData.city,
                location_maps: formData.location_maps
            };

            await createActivity(activityData);
            setShowModal(false);
            setFormData({
                title: '',
                description: '',
                categoryId: '',
                imageUrls: null,
                price: '',
                price_discount: '',
                rating: '',
                total_reviews: '',
                facilities: '',
                address: '',
                province: '',
                city: '',
                location_maps: ''
            });
            setSuccessMessage('Promo created successfully.');
            setTimeout(() => {
                setSuccessMessage(null);
                window.location.reload()
            }, 3000);
        } catch (error) {
            console.error('Error creating vacations:', error);
        }
    };

    return (
        <DashboardLayout>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
                <div className="form-selecttt container">
                    <div>
                    <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Create vacations
                    </button>
                    </div>
                    <div>
                    <select onChange={handleCategoryChange}>
                        <option value="all">Filter</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    </div>
                </div>
                <div className="row">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((activity) => (
                            <div className="col-md-4" key={activity.id}>
                                <div className="mb-4">
                                    <img src={activity.imageUrls} className="card-img" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{activity.title}</h5>
                                        <div className="location-vacations">
                                            <p className="city-vacations">{activity.city}</p>
                                            <p className="province-vacations">{activity.province}</p>
                                        </div>
                                        <div className="price">
                                            <p className="original-price">{formatPrice(activity.price)}</p>
                                            <p className="discounted-price">{formatPrice(activity.price_discount)}</p>
                                        </div>
                                    </div>
                                    <Link href={`/dashboard/vacations/${activity.id}`}><button className="activitys-button">See Detail</button></Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-md-12">
                            <p>No activities found</p>
                        </div>
                    )}
            </div>

             {/* modal */}
            <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Create Activity</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Title</label>
                                            <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Terms & Conditions</label>
                                            <textarea className="form-control" name="terms_condition" value={formData.terms_condition} onChange={handleChange}></textarea>
                                        </div>
                                         <div className="mb-3">
                                            <label className="form-label">Facilities</label>
                                            <textarea className="form-control" name="facilities" value={formData.facilities} onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Price</label>
                                            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Discount Price</label>
                                            <input type="number" className="form-control" name="price_discount" value={formData.price_discount} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Category</label>
                                            <select className="form-select" name="categoryId" onChange={handleChange}>
                                                <option value="">Select category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Rating</label>
                                            <input type="number" className="form-control" name="rating" value={formData.rating} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Total Reviews</label>
                                            <input type="number" className="form-control" name="total_reviews" value={formData.total_reviews} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Province</label>
                                            <input type="text" className="form-control" name="province" value={formData.province} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">City</label>
                                            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Location Maps</label>
                                            <input type="text" className="form-control" name="location_maps" value={formData.location_maps} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" name="imageUrls" onChange={handleChange} />
                                            {formData.imageUrls && <img src={formData.imageUrls} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
                                        </div>
                                    </div>
                                </div>
                                {errorMessage && (
                                    <div className="alert alert-danger" role="alert">
                                        {errorMessage}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
