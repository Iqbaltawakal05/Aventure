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

        localStorage.removeItem('token');
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
            profilePictureUrl: "https://img.freepik.com/free-vector/cute-cat-playing-laptop-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated_138676-9529.jpg?w=740&t=st=1713417927~exp=1713418527~hmac=0673ec746df45b1ec2d1ba3a39bc6120458f637e272c245847c0f7f48e1e0912",
            phoneNumber: "-",
        },
        {
            headers: {
                apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
                'Content-Type': 'application/json',
            }
        });

        console.log(res.data)

    }
        catch (error) {
            console.log(error);
        }
    };

export { LoginData, LogoutData, RegisterData }