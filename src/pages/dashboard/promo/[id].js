import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { fetchPromoById, updatePromo, deletePromo } from '@/API/PromoAPI';
import DashboardLayout from "@/Components/DashboardLayout";
import { UploadImg } from "@/API/UploadImgAPI";

export default function PromoDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [promo, setPromo] = useState(null);
    const [editedPromo, setEditedPromo] = useState(null);
    const [imagefile, setImageFile] = useState(null);

    useEffect(() => {
        async function fetchPromo() {
            try {
                const promoData = await fetchPromoById(id);
                setPromo(promoData);
                setEditedPromo(promoData);
            } catch (error) {
                console.error("Error fetching promo data:", error);
            }
        }

        if (id) {
            fetchPromo();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageUrl") {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEditedPromo({ ...editedPromo, imageUrl: reader.result });
                setImageFile(file);
            };
        } else {
            setEditedPromo({ ...editedPromo, [name]: value });
        }
    };

    const handleSubmit = async () => {

        try {
            const uploadResponse = await UploadImg(imagefile);
            const imageUrl = uploadResponse.data.url;
            const promoData = {
                title: editedPromo.title,
                description: editedPromo.description,
                promo_code: editedPromo.promo_code,
                imageUrl: imageUrl
            }
            await updatePromo(id, promoData);
            router.push('/dashboard/promo');
            router.reload()
        } catch (error) {
            console.error("Error updating promo:", error);
        }
    };

    const handleDelete = async () => {
    try {
        if (confirm("Are you sure you want to delete this promo?")) {
            await deletePromo(id);
            router.push('/dashboard/promo', '/');
        }
    } catch (error) {
        console.error("Error deleting promo:", error);
    }
    };

    if (!promo) {
        return <DashboardLayout>Loading...</DashboardLayout>;
    }

    return (
        <DashboardLayout>
            <div className="text-center">
                <img src={promo.imageUrl} />
                <p>{promo.title}</p>
                <p>{promo.description}</p>
                <p>{promo.promo_code}</p>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit Promo
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
                                    <input type="text" name="title" value={editedPromo.title} onChange={handleInputChange} />
                                </label>
                                <label>Description:
                                    <input type="text" name="description" value={editedPromo.description} onChange={handleInputChange} />
                                </label>
                                <label>Promo Code:
                                    <input type="text" name="promo_code" value={editedPromo.promo_code} onChange={handleInputChange} />
                                </label>
                                <label>image :
                                    <input type="file" id="imageUrl" name="imageUrl" onChange={handleInputChange} /><br />
                                    {editedPromo.imageUrl && <img src={editedPromo.imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
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