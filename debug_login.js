async function testLogin() {
    try {
        const response = await fetch('https://library-management-system-v9gy.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password'
            })
        });
        
        console.log('Status:', response.status);
        console.log('Status Text:', response.statusText);
        const text = await response.text();
        console.log('Response Body:', text.substring(0, 1000));
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testLogin();
