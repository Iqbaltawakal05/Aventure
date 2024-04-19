import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import DashboardLayout from "@/Components/DashboardLayout";
import { deleteBanner, fetchBannerById, updateBanner } from "@/API/BannerAPI";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [banner, setBanner] = useState(null);
    const [editedBanner, setEditedBanner] = useState(null);

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
        const { name, value } = e.target;
        setEditedBanner({ ...editedBanner, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateBanner(id, editedBanner);
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
                <img src={banner.imageUrl} />
                <p>{banner.name}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit banner
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
                                    <input type="text" name="name" value={editedBanner.name} onChange={handleInputChange} />
                                </label>
                                <label>image :
                                    <input type="text" name="imageUrl" value={editedBanner.imageUrl} onChange={handleInputChange} />
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