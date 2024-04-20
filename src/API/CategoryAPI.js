import axios from "axios";
import BASE_URL from "@/API/baseURL";
async function fetchAllCategoriesData() {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/categories`, 
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        });
        return response.data.data;
    } catch (error) {
        return null;
    }
}

async function fetchCategoryById(id) {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/category/${id}`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            }
        })
        return response.data.data;
    } catch (error) {
        return null;
    }
}

async function updateCategory(id, categoryData) {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/update-category/${id}`, categoryData, {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

async function deleteCategory(id) {
    try {
        const response = await axios.delete(`${BASE_URL}/api/v1/delete-category/${id}`,
         {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        return null;
    }
}

async function createCategory(formData) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/v1/create-category`,
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
        return null;
    }
};

export { fetchAllCategoriesData, fetchCategoryById, updateCategory, deleteCategory, createCategory }