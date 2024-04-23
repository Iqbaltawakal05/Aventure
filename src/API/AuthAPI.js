import axios from "axios";

async function LoginData(email, password, setLoading) {
    try {
        const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login',
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
        localStorage.setItem('name', res.data.data.name);
        localStorage.setItem('profile', res.data.data.profilePictureUrl);

        const token = localStorage.getItem('token');

        if (token) {
            window.location.href = '/dashboard';
        }
        alert(res.data.message);
        setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
        }
    };

async function LogoutData() {
    try {
        const res = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout',
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });

        localStorage.removeItem('token', 'name');
        window.location.href = '/';

    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

async function RegisterData(name, email, password, passwordRepeat) {
    try {
        const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register', 
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

        console.log(res.data)
        alert(res.message);
    }
        catch (error) {
            console.log(error);
            alert(error.response.data.message);
        }
    };

export { LoginData, LogoutData, RegisterData }