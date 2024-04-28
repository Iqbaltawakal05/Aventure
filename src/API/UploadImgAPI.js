import axios from "axios";
import BASE_URL from '@/API/baseURL';

async function UploadImg(imageFile) {
    try {

        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`${BASE_URL}/api/v1/upload-image`, 
        formData,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching upload data:', error);
        return null;
    }
}

export { UploadImg }