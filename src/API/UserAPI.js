import axios from "axios";

async function fetchAllUserData() {
    try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user', 
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
    const response = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`, { role: newRole },
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

export { fetchAllUserData, updateUserRole }