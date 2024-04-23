import axios from "axios";

async function UploadImg(imageFile) {
    try {

        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(` https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image`, 
        formData,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching upload data:', error);
        return null;
    }
}

export { UploadImg }