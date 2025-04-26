  # HumanChain AI Safety Incident Log API

## Overview
A RESTful API service built with TypeScript and Express.js for logging and managing AI safety incidents. The service uses PostgreSQL for data persistence and provides endpoints for creating, retrieving, and deleting incident records.

## Technology Stack
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Node-Postgres (pg)

## Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/OrcasXCode/humanchainai-be
cd HumalAIChain
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a `.env` file in the root directory with the following variables:
```plaintext
PGUSER=your_username
PGHOST=your_host
PGDATABASE=your_database
PGPASSWORD=your_password
PGPORT=your_port
PORT=3000
```

4. **Database Setup**
The application will automatically create the required schema when started. The schema includes:
- `incidents` table with fields:
  - `id` (auto-incrementing primary key)
  - `title` (string)
  - `description` (text)
  - `severity` (enum: 'Low', 'Medium', 'High')
  - `reported_at` (timestamp with timezone)

5. **Run the Application**
```bash
npm run dev
```
The server will start on http://localhost:3000

## API Endpoints

### 1. Get All Incidents
```bash
GET /incidents
```
Response (200 OK):
```json
[
  {
    "id": 1,
    "title": "System Outage",
    "description": "AI system experienced unexpected shutdown",
    "severity": "High",
    "reported_at": "2024-02-20T10:00:00Z"
  }
]
```

### 2. Create New Incident
```bash
POST /incidents
Content-Type: application/json

{
  "title": "Data Anomaly",
  "description": "Unexpected patterns in AI output",
  "severity": "Medium"
}
```
Response (201 Created):
```json
{
  "id": 2,
  "title": "Data Anomaly",
  "description": "Unexpected patterns in AI output",
  "severity": "Medium",
  "reported_at": "2024-02-20T11:00:00Z"
}
```

### 3. Get Specific Incident
```bash
GET /incidents/{id}
```
Response (200 OK):
```json
{
  "id": 1,
  "title": "System Outage",
  "description": "AI system experienced unexpected shutdown",
  "severity": "High",
  "reported_at": "2024-02-20T10:00:00Z"
}
```

### 4. Delete Incident
```bash
DELETE /incidents/{id}
```
Response: 204 No Content

## Error Handling
The API includes comprehensive error handling:
- 400 Bad Request: Invalid input data
- 404 Not Found: Incident not found
- 500 Internal Server Error: Server-side issues

## Sample Data
You can populate the database with sample incidents using Postman or curl:
<img src="https://i.ibb.co/236cQwHG/Screenshot-2025-04-26-213804.png" alt="Database Structure in pgAdmin" width="100%" />


```bash
curl -X POST http://localhost:3000/incidents \
-H "Content-Type: application/json" \
-d '{
  "title": "System-wide Network Outage",
  "description": "Complete network failure affecting all production servers",
  "severity": "High"
}'
```

## Design Decisions
1. **TypeScript**: Chosen for type safety and better development experience
2. **Express.js**: Lightweight and flexible framework for building REST APIs
3. **PostgreSQL**: Robust relational database with excellent JSON support
4. **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
5. **Automatic Schema Creation**: Database schema is automatically created on application startup
