import { useState } from 'react';
import { createBanner } from '@/API/BannerAPI';
import { useRouter } from 'next/router';

export default function CreateBanner() {
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
    });

    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.imageUrl) {
            console.error('Semua kolom harus diisi.');
            return;
        }

        try {
            await createBanner(formData);
            router.push('/dashboard/banner');
        } catch (error) {
            console.error('Error creating banner:', error);
        }
    };

    return (
        <div>
            <h1>Create Promo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />
                <label htmlFor="imageUrl">Image URL:</label><br />
                <input type="text" id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} /><br />
                <button type="submit">Create Promo</button>
            </form>
        </div>
        );
}