import { useState } from 'react';
import { useRouter } from 'next/router';
import { createActivity } from '@/API/ActivityAPI';

export default function CreateActivity() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrls: '',
        price: '',
        price_discount: '',
        rating: '',
        total_reviews: '',
        facilities: '',
        address: '',
        province: '',
        city: '',
        location_maps: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' || name === 'price_discount' ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description || !formData.imageUrls || !formData.price || !formData.price_discount || !formData.rating || !formData.total_reviews || !formData.facilities || !formData.address || !formData.province || !formData.city || !formData.location_maps) {
            console.error('Semua kolom harus diisi.');
            return;
        }

        try {
            await createActivity(formData);
            router.push('/dashboard/vacations', '/');
        } catch (error) {
            console.error('Error creating vacations:', error);
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
                <input type="text" id="imageUrl" name="imageUrls" value={formData.imageUrls} onChange={handleChange} /><br />
                <label htmlFor="price">Price:</label><br />
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} /><br />
                <label htmlFor="price_discount">Price Discount:</label><br />
                <input type="number" id="price_discount" name="price_discount" value={formData.price_discount} onChange={handleChange} /><br />
                <label htmlFor="rating">Rating:</label><br />
                <input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} /><br />
                <label htmlFor="total_reviews">Total Reviews:</label><br />
                <input type="number" id="total_reviews" name="total_reviews" value={formData.total_reviews} onChange={handleChange} /><br />
                <label htmlFor="facilities">Facilities:</label><br />
                <input type="text" id="facilities" name="facilities" value={formData.facilities} onChange={handleChange} /><br />
                <label htmlFor="address">Address:</label><br />
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} /><br />
                <label htmlFor="province">Province:</label><br />
                <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} /><br />
                <label htmlFor="city">City:</label><br />
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} /><br />
                <label htmlFor="location_maps">Location Maps:</label><br />
                <input type="text" id="location_maps" name="location_maps" value={formData.location_maps} onChange={handleChange} /><br />
                <button type="submit">Create Promo</button>
            </form>
        </div>
    );
}