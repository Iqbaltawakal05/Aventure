import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { deleteBanner, fetchBannerById, updateBanner } from "@/API/BannerAPI";
import { UploadImg } from '@/API/UploadImgAPI';
import Link from "next/link";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState(null);
    const [editedBanner, setEditedBanner] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        async function fetchBanner() {
            try {
                const bannerData = await fetchBannerById(id);
                setBanner(bannerData);
                setEditedBanner(bannerData);
            } catch (error) {
                console.error("Error fetching banner data:", error);
            }
        }

        if (id) {
            fetchBanner();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageUrl") {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEditedBanner({ ...editedBanner, imageUrl: reader.result });
                setImageFile(file);
            };
        } else {
            setEditedBanner({ ...editedBanner, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bannerData = {
                name: editedBanner.name,
                imageUrl: editedBanner.imageUrl,
            };
            if (imageFile) {
                const uploadResponse = await UploadImg(imageFile);
                bannerData.imageUrl = uploadResponse.data.url;
            }
            await updateBanner(id, bannerData);
            setSuccessMessage("Banner updated successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.reload();
            }, 3000);
        } catch (error) {
            console.error("Error updating banner:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBanner(id);
            setSuccessMessage("Banner deleted successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.push('/dashboard/banner');
            }, 3000);
        } catch (error) {
            console.error("Error deleting banner:", error);
        }
    };

    if (!banner) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <div className="back-buttonid">
                    <div className="d-flex gap-3">
                        <Link href="/dashboard/banner"><i className="bi bi-chevron-left"></i></Link>
                        <div>
                            <Link href="/dashboard/banner">{banner.name}</Link>
                        </div>
                    </div>
                    <div className="ratingActivity">
                        <button type="button" className="btn btn-edit" onClick={() => setShowModalEdit(true)}>
                            Edit
                        </button>
                        <button type="button" className="btn btn-delete" onClick={() => setShowModalDelete(true)}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className='imageActivityId'>
                    <img src={banner.imageUrl} alt={banner.name} />
                </div>
            </div>

            {/* Edit Modal */}
            <div className={`modal ${showModalEdit ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit banner</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={editedBanner.name} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="imageUrl" onChange={handleInputChange} />
                                    {editedBanner.imageUrl && <img src={editedBanner.imageUrl} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
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
                        <div className="modal-body">
                            <p>Are you sure you want to delete this banner?</p>
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
