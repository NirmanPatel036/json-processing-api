// utils/logger.js
const fs = require('fs');
const path = require('path');

const logRequest = (req, res, startTime) => {
    // 1. Calculate how long the request took
    const duration = Date.now() - startTime;

    // 2. Format the log message: [Timestamp] Method URL - Status - Duration
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${req.method} ${req.url} - Status: ${res.statusCode} - ${duration}ms\n`;

    // 3. Print to Console (for you to see while developing)
    process.stdout.write(logMessage);

    // 4. Write to File (persistent record)
    const logFilePath = path.join(__dirname, '../server.log');
    
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
};

module.exports = { logRequest };