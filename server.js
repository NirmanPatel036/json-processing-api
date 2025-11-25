// server.js
const http = require('http');
const { getBody } = require('./utils/bodyParser');
const { validate } = require('./utils/validator');
const { filterData, sortData, aggregateData } = require('./services/operations');
const { logRequest } = require('./utils/logger');

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const startTime = Date.now();

    // Helper to safely send response and Log it (CORS friendly)
    const sendResponse = (statusCode, data) => {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
        
        logRequest(req, res, startTime); 
    };

    if (req.url === '/' && req.method === 'GET') {
        return sendResponse(200, { message: "Server is running." });
    } else if (req.url === '/api/process' && req.method === 'POST') {
        try {
            const body = await getBody(req);

            const isValid = validate(body);
            if (!isValid) {
                // Use helper instead of res.end directly
                return sendResponse(400, { 
                    error: "Validation Failed", 
                    details: validate.errors 
                });
            }

            let result;
            const { dataset, operation, criteria, sortBy, targetField, aggType } = body;

            switch (operation) {
                case 'filter':
                    result = filterData(dataset, criteria);
                    break;
                case 'sort':
                    result = sortData(dataset, sortBy);
                    break;
                case 'aggregate':
                    result = aggregateData(dataset, aggType, targetField);
                    break;
                default:
                    return sendResponse(400, { error: "Unknown Operation" });
            }

            return sendResponse(200, { success: true, operation, result });

        } catch (err) {
            console.error(err);
            return sendResponse(500, { error: "Internal Server Error" });
        }
    } else {
        return sendResponse(404, { error: "Endpoint not found" });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running and is healthy. Listening on port ${PORT}.`);
});