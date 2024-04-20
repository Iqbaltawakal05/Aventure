import axios from "axios";
import BASE_URL from '@/API/baseURL';

async function fetchAllActivitiesData() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/activities`, 
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

async function fetchActivityById(id) {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/activity/${id}`,
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

async function updateActivity(id, activityData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/update-activity/${id}`, activityData, {
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

async function deleteActivity(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/delete-activity/${id}`,
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

async function createActivity(formData) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/create-activity`,
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
        console.error('Error creating activity:', error);
        return null;
    }
};

async function fetchActivityByCategoryId(categoryId) {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/activities-by-category/${categoryId}`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
            params: {
                type: 'vacation'
            }
        })
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export { fetchAllActivitiesData, fetchActivityById, updateActivity, deleteActivity, createActivity, fetchActivityByCategoryId }