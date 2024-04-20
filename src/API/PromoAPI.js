import axios from "axios";
import BASE_URL from "@/API/baseURL";

async function fetchAllPromoData() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/promos`, 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        });

        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function fetchPromoById(id) {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/promo/${id}`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        })
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function updatePromo(id, promoData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/update-promo/${id}`, promoData, {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating promo:', error);
        return null;
    }
}

async function deletePromo(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/delete-promo/${id}`,
         {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error updating promo:', error);
        return null;
    }
}

async function createPromo(formData) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/create-promo`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Error creating promo:', error);
    }
};

export { fetchAllPromoData, fetchPromoById, updatePromo, deletePromo, createPromo }