import axios from "axios";

async function fetchAllPromoData() {
    try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos', 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        });
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function fetchPromoById(id) {
    try {
        const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        });
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export { fetchAllPromoData, fetchPromoById }