import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { deleteCategory, fetchCategoryById, updateCategory } from "@/API/CategoryAPI";
import { UploadImg } from '@/API/UploadImgAPI';

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState(null);
    const [editedCategory, setEditedCategory] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        async function fetchCategory() {
            try {
                const categoryData = await fetchCategoryById(id);
                setCategory(categoryData);
                setEditedCategory(categoryData);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        if (id) {
            fetchCategory();
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageUrl") {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEditedCategory({ ...editedCategory, imageUrl: reader.result });
                setImageFile(file);
            };
        } else {
            setEditedCategory({ ...editedCategory, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (imageFile) {
                const uploadResponse = await UploadImg(imageFile);
                const imageUrl = uploadResponse.data.url;
                const categoryData = {
                    name: editedCategory.name,
                    imageUrl: imageUrl,
                };
                await updateCategory(id, categoryData);
            } else {
                const categoryData = {
                    name: editedCategory.name,
                    imageUrl: editedCategory.imageUrl,
                };
                await updateCategory(id, categoryData);
            }
            setSuccessMessage("Category updated successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.reload();
            }, 2000);
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCategory(id);
            setSuccessMessage("Category deleted successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.push('/dashboard/category');
            }, 2000);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (!category) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <div className="back-buttonid">
                    <div className="d-flex gap-3">
                        <a href="/dashboard/category"><i className="bi bi-chevron-left"></i></a>
                        <div>
                            <a href="/dashboard/category">{category.name}</a>
                        </div>
                    </div>
                    <div className="ratingActivity">
                        <button type="button" className="btn btn-edit" onClick={() => setShowModalEdit(true)}>
                            Edit category
                        </button>
                        <button type="button" className="btn btn-delete" onClick={() => setShowModalDelete(true)}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className='imageActivityId'>
                    <img src={category.imageUrl} alt={category.name} />
                </div>
            </div>

            {/* Edit Modal */}
            <div className={`modal ${showModalEdit ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Category</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={editedCategory.name} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="imageUrl" onChange={handleInputChange} />
                                    {editedCategory.imageUrl && <img src={editedCategory.imageUrl} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
                                </div>
                                {successMessage && (
                                    <div className="alert alert-success" role="alert">
                                        {successMessage}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModalEdit(false)}>Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
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
                            <p>Are you sure you want to delete this category?</p>
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
    );
}