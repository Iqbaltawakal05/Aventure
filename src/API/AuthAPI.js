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
        
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}

export { LoginData, LogoutData }