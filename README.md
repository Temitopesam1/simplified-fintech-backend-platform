# Fintech Backend Platform

A simplified **fintech backend platform** built with **NestJS**, **MySQL**, and **MongoDB**.  
This project demonstrates core financial services functionality including user management, authentication, KYC, role-based access, logging, and API documentation.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Authentication Flow](#authentication-flow)
- [Endpoints](#endpoints)
- [Roles & Guards](#roles--guards)
- [Logging](#logging)
- [Testing](#testing)
- [Docker Setup](#docker-setup)
- [Architecture Decisions](#architecture-decisions)

---

## Features

- User registration/login with **JWT-based authentication**
- Email verification (mocked)
- Refresh token support
- Profile management (view/update)
- KYC (Know Your Customer) data collection
- Role-based access control (user/admin)
- Swagger API documentation
- Logging to **MongoDB** for requests and transactions

---

## Tech Stack

- **Backend**: NestJS + TypeScript
- **Primary DB**: MySQL (TypeORM)
- **Secondary DB**: MongoDB (for logging)
- **Authentication**: JWT
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

---

## Requirements

- Node.js >= 20.x
- NPM >= 9.x
- Docker (optional, recommended)
- MySQL >= 8.x
- MongoDB >= 6.x

---

## Setup & Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/fintech-backend.git
cd fintech-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root:

```env
# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=fintech

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d

# MongoDB
MONGO_URI=mongodb://localhost:27017/fintech_logs

# Server
PORT=3000
```

---

## Running the Project

1. Start MySQL and MongoDB:

```bash
# MySQL (if using Docker)
docker run --name fintech-mysql -e MYSQL_ROOT_PASSWORD=yourpassword -p 3306:3306 -d mysql:8

# MongoDB (if using Docker)
docker run --name fintech-mongo -p 27017:27017 -d mongo
```

2. Run migrations and seeds (MySQL):

```bash
sequelize init
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
## NB: Make sure to add the right configuration value in your config.json file

3. Start the NestJS application:

```bash
npm run start:dev
```

4. Access Swagger docs:

```
http://localhost:3000/api
```

---

## Database Setup

### MySQL (TypeORM)

- Tables:
  - `users`
  - `refresh_tokens`
  - `kyc_data`
  - `roles`

- Migrations: `npx sequelize-cli db:migrate`
- Seed data: `npx sequelize-cli db:seed:all`

### MongoDB (Logging)

- Database: `fintech_logs`
- Collection: `logs`
- Stores request info, error logs, and financial transactions

---

## API Documentation

- Swagger: [http://localhost:3000/api](http://localhost:3000/api)
- Postman collection included: `postman/Fintech.postman_collection.json`
- Contains request examples for all auth and profile endpoints

---

## Authentication Flow

1. **Register** (`POST /auth/register`)
   - Sends verification token (mocked, logged to console)
2. **Verify email** (`GET /auth/verify-email?token=xxx`)
   - Activates account
3. **Login** (`POST /auth/login`)
   - Returns `accessToken` and `refreshToken`
4. **Refresh token** (`POST /auth/refresh`)
   - Returns new `accessToken`
5. **Profile** (`GET /auth/profile`)
   - Requires JWT
6. **Update Profile** (`PUT /auth/profile`)
   - Requires JWT

---

## Endpoints

| Method | Endpoint                  | Description                    | Auth Required |
|--------|---------------------------|--------------------------------|---------------|
| POST   | /auth/register            | Register new user              | ❌             |
| GET    | /auth/verify-email        | Verify email                  | ❌             |
| POST   | /auth/login               | Login                          | ❌             |
| POST   | /auth/refresh             | Refresh JWT token             | ❌             |
| GET    | /auth/profile             | Get user profile              | ✅             |
| PUT    | /auth/profile             | Update user profile           | ✅             |
| POST   | /auth/kyc                 | Submit KYC info               | ✅             |

> Admin-only routes (example):

| Method | Endpoint           | Description          | Roles        |
|--------|------------------|--------------------|-------------|
| GET    | /admin/users      | List all users      | admin       |

---

## Roles & Guards

- Role enum: `user`, `admin`
- `@Roles('admin')` decorator
- `RolesGuard` + `JwtAuthGuard` protects endpoints

---

## Logging

- Logs all requests, errors, and key actions to **MongoDB**
- Schema:

```ts
{
  level: 'info' | 'error',
  message: string,
  context: string,
  timestamp: Date,
}
```

- Global logging interceptor applies across all controllers

---

## Testing

- You can use **Swagger** or **Postman** to test endpoints.
- Create a default admin user via seed:

```ts
username: admin@example.com
password: admin123
role: admin
```

---

## Docker Setup

- `docker-compose.yml` example:

```yaml
version: '3'
services:
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: yourpassword
      MYSQL_DATABASE: fintech
    ports:
      - "3306:3306"

  mongo:
    image: mongo
    ports:
      - "27017:27017"
```

- Run all services:

```bash
docker-compose up -d
```

---

## Architecture Decisions (ADRs)

1. **NestJS** for structured modular backend and DI
2. **TypeORM + MySQL** for transactional data (users, KYC, tokens)
3. **MongoDB** for logging to separate transactional concerns
4. **JWT** for stateless auth with refresh token support
5. **Validation** with class-validator ensures payload safety
6. **Swagger & Postman** for documentation & testability
7. **Roles & Guards** enforce security per assessment requirements
8. **Logging interceptor** for centralized error & action logs

---

## Notes

- Email verification is **mocked** (logged in console)
- Refresh tokens are persisted in **MySQL**
- For production, secrets should be stored in **Vault / environment variables**
- Logging can be extended for auditing financial transactions

---

## Author

Temi Sam  
Backend Developer | Fintech Enthusiast

