***

# Trello-Style Task Management Application - Backend

This repository contains the backend code for a web-based task management application similar to Trello, built using Node.js, Express, TypeScript, Prisma, MongoDB, JSON Web Tokens (JWT), and bcrypt.

The above application was built as a part of [Main Repo](https://github.com/RishabhK88/CreworkHQ-Taskboard) for [assignment](https://crework.notion.site/Assignment-Trello-Style-Task-Management-Application-0bcb3b4db4504d6199b803704e561e87) by [Crework](https://www.crework.club/)

## Features

1. **User Authentication:**
   * Signup and login functionality using email and password.
   * Secure password storage using bcrypt.
   * User session management using JSON Web Tokens (JWT).
2. **Task Management:**
   * Users can create, read, update, and delete tasks.
   * Each task can have:
     * A Title (mandatory)
     * A Description (optional)
     * Status (mandatory, automatically filled when created in a specific section) - To Do, In Progress, Under Review, Completed
     * Priority (optional) - Values: Low, Medium, Urgent
     * Deadline (optional)
   * Tasks can be managed (created, updated, deleted) only by their respective users.

## Tech Stack

* **Backend:** [Node.js](https://nodejs.org/en) with [Express](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/)
* **Validation:** [Zod](https://zod.dev/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Password Hashing:** [Bcrypt](https://www.npmjs.com/package/bcrypt)
* **Session Management:** [JSON Web Tokens (JWT)](https://www.npmjs.com/package/jsonwebtoken)

## Setup Instructions

### Prerequisites

* Node.js
* npm
* MongoDB (local or cloud instance)

### Clone the Repository

```
git clone https://github.com/RishabhK88/Crework-HQ---Backend.git
cd Crework-HQ---Backend
```

### Install Dependencies

```
npm install
```

### Install Typescript (if not already available)

```
npm install typescript
```

### Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DATABASE_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
```

### Build the Application

```
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

* **GET /task**
  * Get all tasks for the logged-in user.
  * Headers: `{ "Authorization": "Bearer <token>" }`
* **GET /task/:taskId**
  * Get task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
* **POST /task**
  * Create a new task.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "title": "Task Title", "description": "Task Description", "status": "ToDo", "priority": "Medium", "deadline": "2024-12-31T23:59:59.999Z" }`
* **PUT /task/:taskId**
  * Update a task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "title": "Updated Title", "description": "Updated Description", "status": "InProgress", "priority": "Urgent", "deadline": "2024-12-31T23:59:59.999Z" }`
* **PUT /task/updateStatus/:taskId**
  * Update task status by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`
  * Request Body: `{ "status": "UnderReview" }`
* **DELETE /task/:taskId**
  * Delete a task by ID.
  * Headers: `{ "Authorization": "Bearer <token>" }`

***
