# Finavyn

A backend REST API for a role-based finance dashboard system. Supports financial record management, user access control, and aggregated dashboard analytics.

Built with **Node.js + Express**, **MongoDB**, and **JWT authentication**.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)

---

## Getting Started

### Prerequisites

- Node.js v18+


### Installation

```bash
git clone https://github.com/sanskritiigarg/finavyn.git
cd finavyn
npm install
```

### Environment Variables

Create a `.env` file in the root directory. Use `.env.example` as a reference:

```env
PORT=3000
MONGODB_URI=MongoDB connection string
JWT_SECRET=a string
JWT_EXPIRE=token expiration time after creation
```

### Run the Server

```bash
# Development
npm run dev

# Production
npm start
```

The server will start at `http://localhost:${3000}`.

---

## API Overview

Full request/response details are available in the Postman collection at `docs/postman_collection.json`. Import it into Postman to test all endpoints.

### Auth

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive a JWT |

### Admin

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/users` | Admin | List all users |
| GET | `/api/users/:id` | Admin | Get a single user |
| PATCH | `/api/users/:id/role` | Admin | Update a user's role |
| PATCH | `/api/users/:id/status` | Admin | Set user active or inactive |
| DELETE | `/api/users/:id` | Admin | Soft-delete a user |

### Financial Records

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | `/api/records` | Admin | Create a financial record |
| GET | `/api/records` | All roles | List records with filters |
| GET | `/api/records/:id` | All roles | Get a single record |
| PUT | `/api/records/:id` | Admin | Update a record |
| DELETE | `/api/records/:id` | Admin | Soft-delete a record |

**Supported query filters for `GET /api/records`:**
- `?type=income` or `?type=expense`
- `?category=salary`
- `?from=2024-01-01&to=2024-12-31`
- `?page=1&limit=10`

### Dashboard

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | `/api/dashboard/summary` | All roles | Total income, expenses, net balance |
| GET | `/api/dashboard/by-category` | All roles | Totals grouped by category |
| GET | `/api/dashboard/trends` | Admin, Analyst | Income/expense trends over time |
| GET | `/api/dashboard/recent` | All roles | Most recent records |

---

## Role Permissions

| Action | Viewer | Analyst | Admin |
|--------|--------|---------|-------|
| View records | ✅ | ✅ | ✅ |
| View dashboard summary | ✅ | ✅ | ✅ |
| Access trends | ❌ | ✅ | ✅ |
| Create / update / delete records | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |

---

## Authentication

All protected routes require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Obtain a token by calling `POST /api/auth/login`.

---

## Project Structure

```
FINAVYN/
├── config/
│   └── db.js
├── middlewares/
│   ├── errorHandler.middleware.js
│   ├── authenticate.middleware.js    
│   └── authorize.middleware.js       
├── models/
│   ├── user.model.js
│   └── record.model.js
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── record.controller.js
│   └── dashboard.controller.js
├── services/
│   ├── auth.service.js
│   ├── user.service.js
│   ├── record.service.js
│   └── dashboard.service.js
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── record.routes.js
│   └── dashboard.routes.js
├── docs/
│   └── postman_collection.json
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## Data Models

### User

```
id, name, email, password (hashed), role (viewer | analyst | admin),
status (active | inactive), createdAt, deletedAt
```

### Financial Record

```
id, amount (positive decimal), type (income | expense), category,
date, notes, createdBy (user ref), createdAt, deletedAt
```

---

## Error Handling

All errors return a consistent JSON shape:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "statusCode": "common status codes are 400, 404, 500"
}
```

---

## Assumptions & Tradeoffs

- **Soft deletes** are used for both users and records. Financial data should never be permanently erased.
- **Inactive users** are blocked at login and cannot authenticate even with a valid password.
- **Analysts** can read all records and access trend analytics but cannot modify data.
- **Deleted records** are excluded from all dashboard aggregations and summary totals.
- **Roles** are stored in the JWT payload to avoid a database lookup on every request. If a user's role is changed, they must log in again for the new role to take effect.

---

## Optional Features Implemented

- [x] JWT Authentication
- [x] Soft delete for users and records
- [x] Pagination on record listing
- [x] Filtering by date range, type, and category
