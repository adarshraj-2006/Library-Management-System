import axios from 'axios';

async function testLogin() {
    try {
        const res = await axios.post('https://library-management-system-v9gy.onrender.com/api/auth/login', {
            email: 'test@example.com',
            password: 'password'
        });
        console.log('Response:', res.status, res.data);
    } catch (error) {
        console.log('Error:', error.response?.status, error.response?.data);
    }
}

testLogin();
