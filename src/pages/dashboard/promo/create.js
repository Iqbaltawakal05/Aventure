import { useState } from 'react';
import { useRouter } from 'next/router';
import { createPromo } from '@/API/PromoAPI';
import { UploadImg } from '@/API/UploadImgAPI';

export default function CreatePromo() {
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

    const router = useRouter();

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
        }
        setFormData({
            ...formData,
            [name]: name === 'promo_discount_price' || name === 'minimum_claim_price' ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.imageUrl || !formData.terms_condition || !formData.promo_code) {
            console.error('Semua kolom harus diisi.');
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
            router.push('/dashboard/promo');
        } catch (error) {
            console.error('Error creating promo:', error);
        }
    };

    return (
        <div>
            <h1>Create Promo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label><br />
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} /><br />
                <label htmlFor="description">Description:</label><br />
                <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea><br />
                <label htmlFor="imageUrl">Image URL:</label><br />
                <input type="file" id="imageUrl" name="imageUrl" onChange={handleChange} /><br />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
                <label htmlFor="terms_condition">Terms & Conditions:</label><br />
                <textarea id="terms_condition" name="terms_condition" value={formData.terms_condition} onChange={handleChange}></textarea><br />
                <label htmlFor="promo_code">Promo Code:</label><br />
                <input type="text" id="promo_code" name="promo_code" value={formData.promo_code} onChange={handleChange} /><br />
                <label htmlFor="promo_discount_price">Promo Discount Price:</label><br />
                <input type="number" id="promo_discount_price" name="promo_discount_price" value={formData.promo_discount_price} onChange={handleChange} /><br />
                <label htmlFor="minimum_claim_price">Minimum Claim Price:</label><br />
                <input type="number" id="minimum_claim_price" name="minimum_claim_price" value={formData.minimum_claim_price} onChange={handleChange} /><br />
                <button type="submit">Create Promo</button>
            </form>
        </div>
    );
}
