function sanitize(url) {
    url = url.trim().replace(/\/+$/, "").replace(/(\/api)+$/, "");
    return url + "/api/";
}

console.log("Empty:", sanitize(""));
console.log("Domain only:", sanitize("https://example.com"));
console.log("Domain with slash:", sanitize("https://example.com/"));
console.log("Domain with api:", sanitize("https://example.com/api"));
console.log("Domain with api slash:", sanitize("https://example.com/api/"));
console.log("Domain with double api:", sanitize("https://example.com/api/api/"));
