import { createCategory, fetchAllCategoriesData } from "@/API/CategoryAPI";
import DashboardLayout from "@/Components/DashboardLayout";
import { UploadImg } from "@/API/UploadImgAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Category() {
    const [category, setCategory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        imageFile: null,
    });

    useEffect (() => {
        async function fetchData() {
            const data = await fetchAllCategoriesData();
            setCategory(data);
        }
        fetchData();

    })

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageUrl') {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    imageUrl: reader.result,
                    imageFile: file,
                });
            };
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.imageUrl) {
            setErrorMessage('Semua kolom harus diisi.');
            return;
        }

        try {
            const uploadResponse = await UploadImg(formData.imageFile);
            const imageUrl = uploadResponse.data.url;
            const categoryData = {
                name: formData.name,
                imageUrl: imageUrl,
            };

            await createCategory(categoryData);
            setShowModal(false);
            setFormData({
                name: '',
                imageUrl: '',
                imageFile: null,
            });
            setCategory([...category, categoryData]);
            setSuccessMessage('Category created successfully.');
             setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            console.error('Error creating category:', error);
        }
        };

    return (
        <DashboardLayout>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
                <div className='form-selecttt'>
                <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Create Category
                </button>
                </div>
                <div className="row">
                {category.map((category) => (
                    <div className="col-md-4">
                            <div className="mb-4">
                            <Link href={`/dashboard/category/${category.id}`}>
                                    <img src={category.imageUrl} className="card-img" alt="..." />
                            </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                </div>
                            <Link href={`/dashboard/category/${category.id}`}><button className="activitys-button">See Detail</button></Link>
                            </div>
                    </div>
                ))}
            </div>

            {/* modal */}
            <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Create Category</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="imageUrl" onChange={handleChange} />
                                    {formData.imageUrl && <img src={formData.imageUrl} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
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
    )
}