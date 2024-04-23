import { useState } from 'react';
import { useRouter } from 'next/router';
import { createCategory } from '@/API/CategoryAPI';
import { UploadImg } from '@/API/UploadImgAPI';

export default function CreateCategory() {
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        imageFile: null,
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
                    imageFile: file,
                });
            };
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.imageUrl) {
            console.error('Semua kolom harus diisi.');
            return;
        }

        try {
            const uploadResponse = await UploadImg(formData.imageFile);
            const imageUrl = uploadResponse.data.url;
            const categoryData = {
                name: formData.name,
                imageUrl: imageUrl,
            };

            await createCategory(categoryData);
            router.push('/dashboard/category');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div>
            <h1>Create Promo</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name:</label><br />
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />
                <label htmlFor="imageUrl">Image URL:</label><br />
                <input type="file" id="imageUrl" name="imageUrl" onChange={handleChange} /><br />
                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
                <button type="submit">Create Category</button>
            </form>
        </div>
        );
}