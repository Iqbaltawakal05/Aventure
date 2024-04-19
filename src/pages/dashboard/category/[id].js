import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { deleteCategory, fetchCategoryById, updateCategory } from "@/API/CategoryAPI";


export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState(null);
    const [editedCategory, setEditedCategory] = useState(null);

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
        const { name, value } = e.target;
        setEditedCategory({ ...editedCategory, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateCategory(id, editedCategory);
            router.push('/dashboard/category', '/');
            router.reload()
        } catch (error) {
            console.error("Error updating category:", error);
        }
    };


    const handleDelete = async () => {
        try {
            if (confirm("Are you sure you want to delete this category?")) {
                await deleteCategory(id);
                router.push('/dashboard/category');
            }
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
                <img src={category.imageUrl} />
                <p>{category.name}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit category
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>

            {/* modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit banner</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <label>Name:
                                    <input type="text" name="name" value={editedCategory.name} onChange={handleInputChange} />
                                </label>
                                <label>image :
                                    <input type="text" name="imageUrl" value={editedCategory.imageUrl} onChange={handleInputChange} />
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
    );
}