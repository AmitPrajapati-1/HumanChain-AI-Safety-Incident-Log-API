# HumanChain AI Safety Incident Log API

## Description

The **HumanChain AI Safety Incident Log API** is a backend service for logging, tracking, and managing safety incidents. It allows users to create, retrieve, and delete incident records. The API uses Redis for caching and PostgreSQL for storage, with rate limiting and security features.

## Technology Stack

- **Node.js** (JavaScript runtime)
- **Express** (Web framework)
- **Sequelize** (ORM for PostgreSQL)
- **Redis** (Caching)
- **Helmet** (Security)
- **Rate Limiting** (Express rate limit)

## Requirements

- Node.js (version 14 or higher)
- PostgreSQL (v12+)
- Redis (v6+)

## Installation

### 1. Clone the repository
    git clone https://github.com/your-username/humanchain-api.git
    cd humanchain-api
    
### 2. Install dependencies
    
    npm install
### 3. Set up environment variables
## Create a .env file in the root of the project with the following variables:
    
    DB_USER=your_postgresql_user
    DB_PASSWORD=your_postgresql_password
    DB_HOST=your_postgresql_host
    DB_PORT=5432
    DB_NAME=your_database_name
    REDIS_HOST=your_redis_host
    REDIS_PORT=your_redis_port
### 4. Set up PostgreSQL database schema
## Run the following command to sync the models with the database:
     
     npm run db:sync
## This will automatically create the required tables in your PostgreSQL database.
### Running the Project Locally
    
    npm start
## The server will run on http://localhost:5000.

### API Endpoints
## 1. Get all incidents
# GET /api/incidents
     
     curl -X GET http://localhost:5000/api/incidents
## 2. Create a new incident
# POST /api/incidents
    
    curl -X POST http://localhost:5000/api/incidents \
    -H "Content-Type: application/json" \
    -d '{"title": "Incident Title", "description": "Incident Description", "severity": "High"}'

## 3. Get an incident by ID
# GET /api/incidents/:id
    
    curl -X GET http://localhost:5000/api/incidents/1
## 4. Delete an incident
# DELETE /api/incidents/:id
    
    curl -X DELETE http://localhost:5000/api/incidents/1
### Design Decisions
- Redis Caching: Redis is used to cache incident data and reduce the load on the PostgreSQL database.
- Sequelize ORM: Sequelize is used to interact with the PostgreSQL database. This simplifies database management and schema handling.
- Security: Helmet middleware is used to set various HTTP headers for enhanced security. Rate limiting is implemented to prevent abuse.

### Troubleshooting
- Ensure that PostgreSQL and Redis are running and accessible.
- Make sure all environment variables are correctly configured.

### License
   ## This project is licensed under the MIT License.



