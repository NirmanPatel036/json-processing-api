const getBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';

        // 1. Collect data chunks
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        // 2. Assemble and Parse
        req.on('end', () => {
            try {
                // If body is empty, return empty object
                const parsed = body ? JSON.parse(body) : {};
                resolve(parsed);
            } catch (error) {
                reject(new Error("Invalid JSON Format"));
            }
        });

        // 3. Handle stream errors
        req.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = { getBody };