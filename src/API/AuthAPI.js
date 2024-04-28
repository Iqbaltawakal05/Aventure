import axios from "axios";
import BASE_URL from '@/API/baseURL';

async function LoginData(email, password) {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/login`,
        {
            email,
            password,
        },
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                'Content-Type': 'application/json',
            }
        });

        localStorage.setItem('token', res.data.token);

        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    };

async function LogoutData() {
    try {
        const res = await axios.get(`${BASE_URL}/api/v1/logout`,
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });

        localStorage.removeItem('token');
        window.location.href = '/';

    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function RegisterData(name, email, password, passwordRepeat) {
    try {
        const res = await axios.post(`${BASE_URL}/api/v1/register`, 
        {
            name,
            email,
            password,
            passwordRepeat,
            role: "admin",
            profilePictureUrl: "https://via.placeholder.com/400",
            phoneNumber: "-",
        },
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                'Content-Type': 'application/json',
            }
        });

    }
        catch (error) {
            console.log(error);
            throw error;
        }
    };

export { LoginData, LogoutData, RegisterData }