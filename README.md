# ✅ Functional Documentation

## 📘 Project Overview

This project is a **Task Management API** built with Node.js, Express, TypeScript, and PostgreSQL. It allows users to:

- Register and log in securely using JWT-based authentication.
- Perform CRUD operations on tasks.
- Filter and paginate tasks.
- Mark tasks as completed.
- Protect user data with authorization and role-based access.

---

## 🧰 Tech Stack & Tools Used

| Category    | Tools / Libraries             |
| ----------- | ----------------------------- |
| Language    | TypeScript                    |
| Runtime     | Node.js                       |
| Framework   | Express                       |
| Database    | PostgreSQL (via AWS RDS)      |
| ORM         | TypeORM                       |
| Auth        | JWT (jsonwebtoken), bcryptjs  |
| Validation  | Joi                           |
| Logging     | log4js                        |
| Environment | dotenv                        |
| Dev Tools   | ts-node-dev, ESLint, Prettier |
| Deployment  | AWS EC2 + RDS (PostgreSQL)    |
| API Testing | Postman                       |

---

## 🔐 Auth Flow Explanation

- Users must first **register** using `/auth/register`.
- On **login** via `/auth/login`, a **JWT token** is generated with a 7-day expiration and returned.
- This token must be included in the `Authorization` header (`Bearer <token>`) for all protected routes.
- A custom middleware (`authenticate`) validates the token and attaches the user ID to the request object for further use.

---

## 🔄 Task Lifecycle

1. **Create Task**
   `POST /tasks`
   Authenticated user creates a new task with title, optional description, and due date.

2. **Retrieve Tasks**
   `GET /tasks`
   Returns a paginated and filterable list of user’s tasks.

3. **Get Task by ID**
   `GET /tasks/:id`
   Fetches specific task by ID if it belongs to the user.

4. **Update Task**
   `PUT /tasks/:id`
   Updates fields like title, description, or due date.

5. **Mark Complete**
   `PATCH /tasks/:id/complete`
   Sets `completed` flag to `true`.

6. **Delete Task**
   `DELETE /tasks/:id`
   Permanently deletes the task.

---

## 🗂️ Route Grouping Explanation

| Group       | Endpoint                                      | Description                                |
| ----------- | --------------------------------------------- | ------------------------------------------ |
| Auth Routes | `/auth/register`, `/auth/login`               | Public routes for user management          |
| User Routes | `/users/me`                                   | Returns profile info of logged-in user     |
| Task Routes | `/tasks`, `/tasks/:id`, `/tasks/:id/complete` | CRUD operations on tasks, protected by JWT |

All task routes are grouped under `/tasks` and are **JWT-protected** using a centralized `authenticate` middleware.

---

## 📌 Assumptions & Limitations

### Assumptions

- Each user sees **only their own tasks**.
- JWT token is passed in `Authorization` header.
- Pagination defaults: `page=1`, `limit=10`.

### Limitations

- No role-based access control (admin/user separation).
- No soft deletion or task archiving.
- No support for task prioritization or reminders.
- No frontend; this is backend-only.

---

## ⚙️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:

   ```env
   PORT=4000
   BASE_URL=http://localhost:4000
   JWT_SECRET=your_jwt_secret
   DB_HOST=your-db-host
   DB_PORT=5432
   DB_USERNAME=your-db-username
   DB_PASSWORD=your-db-password
   DB_DATABASE=your-db-name
   ```

4. **Run the project**

   ```bash
   npm run dev
   ```

5. **API Testing**

   - Use Postman to test endpoints.
   - Import a collection or use sample payloads provided.

### 📭 Postman Collection

You can test all APIs via the Postman collection below:

👉 [Open Postman Collection](https://.postman.co/workspace/My-Workspace~6a545882-6325-4a2d-8e06-d19d171c2213/collection/26565778-3fbdb9d6-5fa1-4e0c-b6aa-9575e21d2d31?action=share&creator=26565778&active-environment=26565778-f794d117-6daf-4da7-8472-6a838274b9b5)
