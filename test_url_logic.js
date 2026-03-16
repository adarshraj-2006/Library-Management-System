const testUrls = [
    "https://library-management-system-v9gy.onrender.com/api",
    "https://library-management-system-v9gy.onrender.com/api/",
    "https://library-management-system-v9gy.onrender.com",
    "http://localhost:5000/api",
    "http://localhost:5000"
];

testUrls.forEach(url => {
    let sanitized = url.trim().replace(/\/+$/, "").replace(/(\/api)+$/, "");
    let final = `${sanitized}/api/`;
    console.log(`Original: [${url}] -> Final: [${final}]`);
});
