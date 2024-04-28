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
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (imageFile) {
                const uploadResponse = await UploadImg(imageFile);
                const imageUrl = uploadResponse.data.url;
                const promoData = {
                    title: editedPromo.title,
                    description: editedPromo.description,
                    promo_code: editedPromo.promo_code,
                    imageUrl: imageUrl
                };
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
            setSuccessMessage("Promo updated successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.reload();
            }, 2000);
        } catch (error) {
            console.error("Error updating promo:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePromo(id);
            setSuccessMessage("Promo deleted successfully.");
            setTimeout(() => {
                setSuccessMessage(null);
                router.push('/dashboard/promo');
            }, 2000);
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
                        <a href="/dashboard/promo"><i className="bi bi-chevron-left"></i></a>
                        <div>
                            <a href="/dashboard/promo">{promo.title}</a>
                        </div>
                    </div>
                    <div className="ratingActivity">
                        <button type="button" className="btn btn-edit" onClick={() => setShowModalEdit(true)}>
                            Edit promo
                        </button>
                        <button type="button" className="btn btn-delete" onClick={() => setShowModalDelete(true)}>
                            Delete
                        </button>
                    </div>
                </div>
                <div className='imageActivityId'>
                    <img src={promo.imageUrl} alt={promo.title} />
                </div>
                <div className='col-md-5 m-5'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='bodyActivityId'>
                                <h3>Promo Code</h3>
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

            {/* Edit Modal */}
            <div className={`modal ${showModalEdit ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Edit Promo</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModalEdit(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control" name="title" value={editedPromo.title} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" name="description" value={editedPromo.description} onChange={handleInputChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Terms & Conditions</label>
                                    <textarea className="form-control" name="terms_condition" value={editedPromo.terms_condition} onChange={handleInputChange}></textarea>
                                </div>
                                </div>
                                <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Promo Code</label>
                                    <input type="text" className="form-control" name="promo_code" value={editedPromo.promo_code} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Promo Discount Price</label>
                                    <input type="number" className="form-control" name="promo_discount_price" value={editedPromo.promo_discount_price} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Minimum Claim Price</label>
                                    <input type="number" className="form-control" name="minimum_claim_price" value={editedPromo.minimum_claim_price} onChange={handleInputChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name="imageUrl" onChange={handleInputChange} />
                                    {editedPromo.imageUrl && <img src={editedPromo.imageUrl} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
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
                            <p>Are you sure you want to delete this promo?</p>
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
