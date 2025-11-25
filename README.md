# JSON Data Processing API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![AJV](https://img.shields.io/badge/AJV-23C8D2?style=for-the-badge&logo=ajv&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)

A lightweight, dependency-minimal Node.js API for processing JSON datasets. This service allows users to perform filtering, sorting, and aggregation operations on datasets provided via HTTP POST requests.

## 🚀 Features

- **Data Filtering**: Filter datasets based on specific key-value criteria.
- **Data Sorting**: Sort datasets by specific fields.
- **Aggregation**: Calculate Sum, Average, or Count for numeric fields.
- **Input Validation**: Robust JSON schema validation using `ajv`.
- **Request Logging**: Tracks request processing time and status codes.

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd json-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   # OR
   node server.js
   ```
   The server will start on `http://localhost:8000`.

## 📡 API Usage

### Health Check
**GET** `/`
```json
{
  "message": "Server is running."
}
```

### Process Data
**POST** `/api/process`

The API accepts a JSON body containing the `dataset` and the requested `operation`.

#### 1. Filter Operation
Filters the dataset where fields match the provided `criteria`.

**Request:**
```json
{
  "dataset": [
    { "id": 1, "role": "admin", "score": 10 },
    { "id": 2, "role": "user", "score": 20 },
    { "id": 3, "role": "admin", "score": 30 }
  ],
  "operation": "filter",
  "criteria": { "role": "admin" }
}
```

**Response:**
```json
{
  "success": true,
  "operation": "filter",
  "result": [
    { "id": 1, "role": "admin", "score": 10 },
    { "id": 3, "role": "admin", "score": 30 }
  ]
}
```

#### 2. Sort Operation
Sorts the dataset by the field specified in `sortBy`.

**Request:**
```json
{
  "dataset": [
    { "name": "Alice", "age": 30 },
    { "name": "Bob", "age": 25 }
  ],
  "operation": "sort",
  "sortBy": "age"
}
```

**Response:**
```json
{
  "success": true,
  "operation": "sort",
  "result": [
    { "name": "Bob", "age": 25 },
    { "name": "Alice", "age": 30 }
  ]
}
```

#### 3. Aggregate Operation
Performs calculations (`sum`, `average`, `count`) on a `targetField`.

**Request:**
```json
{
  "dataset": [
    { "item": "A", "price": 100 },
    { "item": "B", "price": 200 }
  ],
  "operation": "aggregate",
  "aggType": "average",
  "targetField": "price"
}
```

**Response:**
```json
{
  "success": true,
  "operation": "aggregate",
  "result": {
    "average": 150
  }
}
```

## 📂 Project Structure

```
json-api/
├── services/
│   └── operations.js    # Core logic for filter, sort, aggregate
├── utils/
│   ├── bodyParser.js    # Request body parsing helper
│   ├── logger.js        # Request logging utility
│   └── validator.js     # AJV schema validation
├── server.js            # Main server entry point
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## 📝 Logging

Requests are logged to `server.log` (if configured) or console, tracking the method, URL, and processing duration.

## 🛡️ Error Handling

The API returns standard HTTP status codes:
- `200`: Success
- `400`: Validation Error or Unknown Operation
- `404`: Endpoint Not Found
- `500`: Internal Server Error
