import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { deleteBanner, fetchBannerById, updateBanner } from "@/API/BannerAPI";
import { UploadImg } from '@/API/UploadImgAPI';

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState(null);
    const [editedBanner, setEditedBanner] = useState(null);
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

    const handleSubmit = async () => {
            
        try {
            const uploadResponse = await UploadImg(imageFile);
            const imageUrl = uploadResponse.data.url;
            const bannerData = {
                name: editedBanner.name,
                imageUrl: imageUrl,
            };

            await updateBanner(id, bannerData);
            router.push('/dashboard/banner', '/');
            router.reload()
        } catch (error) {
            console.error("Error updating banner:", error);
        }
    };

    const handleDelete = async () => {
    try {
        if (confirm("Are you sure you want to delete this Banner?")) {
            await deleteBanner(id);
            router.push('/dashboard/banner');
        }
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
                                <a href="/"><i class="bi bi-chevron-left"></i></a>
                                <div>
                                    <a href="/">{banner.name}</a>
                                </div>
                            </div>
                            <div className="ratingActivity">
                            <button type="button" className="btn btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Edit banner
                            </button>
                            <button type="button" className="btn btn-delete" onClick={handleDelete}>Delete</button>
                            </div>
                    </div>
                    <div className='imageActivityId'>
                        <img src={banner.imageUrl} alt={banner.name} />
                    </div>
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
                                    <input type="text" name="name" value={editedBanner.name} onChange={handleInputChange} />
                                </label>
                                <label>image :
                                    <input type="file" id="imageUrl" name="imageUrl" onChange={handleInputChange} /><br />
                                    {editedBanner.imageUrl && <img src={editedBanner.imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
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