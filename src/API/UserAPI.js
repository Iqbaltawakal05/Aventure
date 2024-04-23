import axios from "axios";
import BASE_URL from '@/API/baseURL';

async function fetchAllUserData() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/all-user`, 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function updateUserRole(userId, newRole) {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/update-user-role/${userId}`, { role: newRole },
    {
      headers: {
        apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

async function loggedUserData() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/user`, 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `bearer ${localStorage.getItem('token')}`,
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}


export { fetchAllUserData, updateUserRole, loggedUserData }