***

# Trello-Style Task Management Application - Backend

This repository contains the backend code for a web-based task management application similar to Trello, built using Node.js, Express, TypeScript, Prisma, MongoDB, JSON Web Tokens (JWT), and bcrypt.

## Features

1. **User Authentication:**
   * Signup and login functionality using email and password.
   * Secure password storage using bcrypt.
   * User session management using JSON Web Tokens (JWT).
2. **Task Management:**
   * Users can create, read, update, and delete tasks.
   * Each task can have:
     * A title (mandatory)
     * A description (optional)
     * Status (mandatory, automatically filled when created in a specific section)
     * Priority (optional, with values: Low, Medium, Urgent)
     * Deadline (optional)
   * Tasks can be managed (created, updated, deleted) only by their respective users.

## Tech Stack

* **Backend:** Node.js with Express
* **Database:** MongoDB
* **Validation:** Zod
* **ORM:** Prisma
* **Password Hashing:** bcrypt
* **Session Management:** JSON Web Tokens (JWT)

## Setup Instructions

### Prerequisites

* Node.js (v14.x or later)
* npm (v6.x or later)
* MongoDB (local or cloud instance)

### Clone the Repository

```
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies

```
npm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
```

### Build the Application

```
npm install typescript
npx tsc -b
```

### Start the Application

```
node dist/index.js
```

## API Endpoints

### Authentication

* **GET /user/getUser**
  * Get user data by authentication token.
  * Headers: `{ "Authorization": "Bearer <token>" }`
* **POST /user/signup**
  * Signup a new user.
  * Request Body: `{ "name": "John Doe", "username": "john.doe@example.com", "password": "password123" }`
* **POST /user/signin**
  * Login an existing user.
  * Request Body: `{ "username": "john.doe@example.com", "password": "password123" }`

### Tasks

* **GET /tasks**
  * Get all tasks for the logged-in user.
  * Headers: `{ "Authorization": "Bearer <token>" }`
* **GET /tasks/:taskId**
  * Get task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
* **POST /tasks**
  * Create a new task.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "title": "Task Title", "description": "Task Description", "status": "ToDo", "priority": "Medium", "deadline": "2024-12-31T23:59:59.999Z" }`
* **PUT /tasks/:taskId**
  * Update a task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "title": "Updated Title", "description": "Updated Description", "status": "InProgress", "priority": "Urgent", "deadline": "2024-12-31T23:59:59.999Z" }`
* **PUT /tasks/updateStatus/:taskId**
  * Update task status by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "status": "UnderReview" }`
* **DELETE /tasks/:taskId**
  * Delete a task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`

## Contact

For any questions or feedback, please reach out to \[rishabhrare8@gmail.com].

***