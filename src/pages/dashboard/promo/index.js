import { fetchAllPromoData, createPromo } from '@/API/PromoAPI'; // Import createPromo
import { UploadImg } from '@/API/UploadImgAPI';
import DashboardLayout from "@/Components/DashboardLayout";
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function Promo() {
    const [promos, setPromos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        imageFile: null,
        terms_condition: '',
        promo_code: '',
        promo_discount_price: '',
        minimum_claim_price: ''
    });

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAllPromoData();
            setPromos(data);
        }
        fetchData();
    }, []);

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
                    imageFile: file
                });
            };
        } else {
            setFormData({
                ...formData,
                [name]: name === 'promo_discount_price' || name === 'minimum_claim_price' ? parseFloat(value) : value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.imageUrl || !formData.terms_condition || !formData.promo_code) {
            setErrorMessage('Semua kolom harus diisi.');
            return;
        }

        try {
            const uploadResponse = await UploadImg(formData.imageFile);
            const imageUrl = uploadResponse.data.url;
            const promoData = {
                title: formData.title,
                description: formData.description,
                imageUrl: imageUrl,
                terms_condition: formData.terms_condition,
                promo_code: formData.promo_code,
                promo_discount_price: formData.promo_discount_price,
                minimum_claim_price: formData.minimum_claim_price
            };

            await createPromo(promoData);
            setShowModal(false);
            setFormData({
                title: '',
                description: '',
                imageUrl: '',
                imageFile: null,
                terms_condition: '',
                promo_code: '',
                promo_discount_price: '',
                minimum_claim_price: ''
            });
            setSuccessMessage('Promo created successfully.');
            setTimeout(() => {
                setSuccessMessage(null);
                window.location.reload()
            }, 3000);
        } catch (error) {
            console.error('Error creating promo:', error);
            setErrorMessage('Error creating promo. Please try again.');
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
                    Create Promo
                </button>
            </div>
            <div className="row">
                {promos.map((promo) => (
                    <div className="col-md-4" key={promo.id}>
                        <div className="mb-4">
                            <Link href={`/dashboard/promo/${promo.id}`}>
                                <img src={promo.imageUrl} className="card-img" alt="..." />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{promo.title}</h5>
                                <div className='promo-code'>
                                    <p>Use code :</p>
                                    <h5>{promo.promo_code}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* modal */}
            <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Create Promo</h1>
                            <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
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
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Promo Code</label>
                                            <input type="text" className="form-control" name="promo_code" value={formData.promo_code} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Promo Discount Price</label>
                                            <input type="number" className="form-control" name="promo_discount_price" value={formData.promo_discount_price} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Minimum Claim Price</label>
                                            <input type="number" className="form-control" name="minimum_claim_price" value={formData.minimum_claim_price} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input type="file" className="form-control" name="imageUrl" onChange={handleChange} />
                                            {formData.imageUrl && <img src={formData.imageUrl} className="mt-2" alt="Preview" style={{ maxWidth: '200px' }} />}
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