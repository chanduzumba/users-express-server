# Users Express Server

A simple RESTful User Management API built with Express.js. This application demonstrates CRUD operations, middleware usage, request validation, and routing using an in-memory data store.

## Features

* Get all users
* Get a user by ID
* Create a new user
* Update an existing user
* Delete a user
* Request logging middleware
* JSON request parsing
* Input validation middleware
* RESTful API design

## Tech Stack

* Node.js
* Express.js

## Repository

GitHub Repository: https://github.com/chanduzumba/users-express-server

## Installation

### Clone the Repository

```bash
git clone https://github.com/chanduzumba/users-express-server.git
cd users-express-server
```

### Install Dependencies

```bash
npm install
```

## Running the Application

Start the server:

```bash
npm start
```

The server will start on:

```text
http://localhost:5100
```

Console output:

```text
Server running at port 5100
```

## API Endpoints

### Get All Users

**Request**

```http
GET /users
```

**Response**

```json
[
  {
    "id": "1",
    "firstName": "Chandrika",
    "lastName": "Prakash",
    "hobby": "Coding"
  }
]
```

---

### Get User By ID

**Request**

```http
GET /users/:id
```

**Example**

```http
GET /users/1
```

**Success Response**

```json
{
  "id": "1",
  "firstName": "Chandrika",
  "lastName": "Prakash",
  "hobby": "Coding"
}
```

**Not Found**

```json
{
  "message": "User not found"
}
```

---

### Create User

**Request**

```http
POST /user
```

**Body**

```json
{
  "firstName": "Alice",
  "lastName": "Smith",
  "hobby": "Photography"
}
```

**Success Response**

```json
{
  "id": "4",
  "firstName": "Alice",
  "lastName": "Smith",
  "hobby": "Photography"
}
```

**Status Code**

```text
201 Created
```

---

### Update User

**Request**

```http
PUT /user/:id
```

**Example**

```http
PUT /user/1
```

**Body**

```json
{
  "firstName": "Chandrika",
  "lastName": "Prakash",
  "hobby": "Reading"
}
```

**Success Response**

```json
{
  "id": "1",
  "firstName": "Chandrika",
  "lastName": "Prakash",
  "hobby": "Reading"
}
```

---

### Delete User

**Request**

```http
DELETE /user/:id
```

**Example**

```http
DELETE /user/1
```

**Success Response**

```json
{
  "id": "1",
  "firstName": "Chandrika",
  "lastName": "Prakash",
  "hobby": "Coding"
}
```

---

## Validation Rules

The API validates the following fields:

* `firstName`
* `lastName`
* `hobby`

Validation checks:

1. Fields cannot be empty strings.
2. Fields cannot be null.
3. All fields must be strings.

### Invalid Request Example

```json
{
  "firstName": "",
  "lastName": "Smith",
  "hobby": "Reading"
}
```

### Response

```json
{
  "message": "Missing required fields"
}
```

## Middleware

### JSON Parser

```javascript
app.use(express.json())
```

Parses incoming JSON request bodies.

### Request Logger

Logs incoming requests in the format:

```text
GET /users 200
POST /user 201
```

### Validation Middleware

```javascript
validateUserData
```

Ensures request data is present and correctly typed before creating or updating users.

## Sample User Object

```json
{
  "id": "1",
  "firstName": "Chandrika",
  "lastName": "Prakash",
  "hobby": "Coding"
}
```

## Project Structure

```text
users-express-server/
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Notes

* Data is stored in memory and will reset whenever the server restarts.
* No database is used in this project.
* Intended for learning Express.js routing and middleware concepts.

## Author

Chandrika P

GitHub: https://github.com/chanduzumba

## License

MIT License
