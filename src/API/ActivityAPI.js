import axios from "axios";

async function fetchAllActivitiesData() {
    try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities', 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        });
        console.log(response.data.data)
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function fetchActivityById(id) {
    try {
        const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        })
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function updateActivity(id, activityData) {
    try {
        const response = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`, activityData, {
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

export { fetchAllActivitiesData, fetchActivityById, updateActivity }