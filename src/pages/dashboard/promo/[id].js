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
    const [imageFile, setImageFile] = useState(null);

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
            if(imageFile) {
            const uploadResponse = await UploadImg(imageFile);
            const imageUrl = uploadResponse.data.url;
            const promoData = {
                title: editedPromo.title,
                description: editedPromo.description,
                promo_code: editedPromo.promo_code,
                imageUrl: imageUrl
            }
            await updatePromo(id, promoData);
        } else {
            const promoData = {
                title: editedPromo.title,
                description: editedPromo.description,
                promo_code: editedPromo.promo_code,
                imageUrl: editedPromo.imageUrl
            };
            await updatePromo(id, promoData);
        }
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
                <section className="container">
                        <div className="back-buttonid">
                            <div className="d-flex gap-3">
                                <a href="/dashboard/promo"><i class="bi bi-chevron-left"></i></a>
                                <div>
                                    <a href="/dashboard/promo">{promo.title}</a>
                                </div>
                            </div>
                            <div className="ratingActivity">
                            <button type="button" className="btn btn-edit" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Edit category
                            </button>
                            <button type="button" className="btn btn-delete" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                        <div className='imageActivityId'>
                            <img src={promo.imageUrl} alt={promo.title} />
                        </div>
                        <div className='col-md-5 m-5'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='bodyActivityId'>
                                    <h3>Promo Code </h3>
                                    <h5>{promo.promo_code}</h5>
                                    </div>
                                    <div className="bodyActivityId">
                                        <h3>Normal price</h3>
                                        <div className="d-flex original-prices">
                                            <h5>{formatPrice(promo.minimum_claim_price)}</h5>
                                            <h5>/person</h5>
                                        </div>
                                    </div>
                                    <div className="bodyActivityId">
                                        <h3>Discount price</h3>
                                        <div className="d-flex discount-prices">
                                            <h5>{formatPrice(promo.promo_discount_price)}</h5>
                                            <h5>/person</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='bodyActivityId'>
                                    <h3>Description</h3>
                                    <h5>{promo.description}</h5>
                                    <h3>terms & condition</h3>
                                    <h5>{promo.terms_condition}</h5>
                                </div>
                                </div>
                        </div>
                        </div>
                    </section>

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