# CarSet Task Management API

Welcome! This is the backend API for **CarSet**, a luxury car rental platform focused on delivering premium rental experiences. This particular system is built for the **internal operations team** — such as fleet managers, support staff, and onboarding leads — to help them **track, manage, and assign tasks** like verifying documents, scheduling maintenance, and onboarding new drivers.

---

##  Features

-  JWT-based authentication (register & login)
-  CRUD operations for tasks
-  Task assignment and status tracking
-  MongoDB for flexible data modeling
-  Joi validation for safe request handling
-  Docker support for containerized development
-  Postman collection included for easy API testing

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for auth
- **Joi** for request validation
- **Docker** for containerization

---

##  Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/genos-ux/carset-task-api.git
cd carset-task-api

### 2. Install the dependencies

```bash
npm install

### 3. Set up your .env file

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### 4. Run the app

npm run dev


## API DOCUMENTATION
You can test all endpoints using the included Postman collection:

👉 Postman Collection JSON

Endpoints include:

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and receive JWT

GET /api/tasks – List all tasks 

POST /api/tasks – Create a task 

PUT /api/tasks/:id – Edit a task

DELETE /api/tasks/:id – Delete a task


## FOLDER STRUCTURE

├── controllers/         # Logic for auth & task endpoints
├── middleware/          # JWT authentication, validation
├── models/              # Mongoose schemas
├── routes/              # API route definitions
├── validators/          # Joi input schemas
├── index.js            # App entry point
├── Dockerfile
├── docker-compose.yml
├── .env.example
