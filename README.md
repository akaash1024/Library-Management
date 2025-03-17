# Library Management API

A comprehensive RESTful API for managing a library system with user authentication, book catalog management, author management, and book borrowing functionality.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Author Management](#author-management)
  - [Book Management](#book-management)
  - [Borrowing System](#borrowing-system)
  - [Admin Functions](#admin-functions)
- [Authentication](#authentication-1)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Environment Variables](https://github.com/akaash1024/Library-Management/blob/main/LibraryManagement.postman_collection.json)


## Overview

This Library Management API provides a complete backend solution for a digital library system. It allows users to browse books, check author information, borrow books, and return them. Administrators have additional capabilities to manage the entire library catalog, user accounts, and monitor borrowing activities.

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access Control**: Different permissions for regular users and administrators
- **Book Catalog**: Comprehensive book management with metadata
- **Author Management**: Track author information and their publications
- **Borrowing System**: Borrow and return functionality with status tracking
- **Admin Dashboard**: Special endpoints for administrative functions

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | User login with email and password |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/user` | Get current user information |
| GET | `/auth/user/:id` | Get user by ID |
| PATCH | `/auth/user/:id` | Update user information |

### Author Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/authors/` | Get all authors |
| GET | `/authors/:id` | Get author by ID |

### Book Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/books/` | Get all books |
| GET | `/books/:id` | Get book by ID |

### Borrowing System

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/borrowings/` | Borrow a book |
| GET | `/borrowings/my` | Get books borrowed by the current user |
| PUT | `/borrowings/:bookId/return` | Return a borrowed book |

### Admin Functions

**User Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | Get all users |
| GET | `/admin/user/:id` | Get user by ID |
| PATCH | `/admin/user/:id` | Update user information |
| DELETE | `/admin/user/:id` | Delete user |

**Author Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/author` | Add a new author |
| PATCH | `/admin/author/:id` | Update author information |
| DELETE | `/admin/author/:id` | Delete author |

**Book Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/book` | Add a new book |
| GET | `/admin/book` | Get all books |
| GET | `/admin/book/:id` | Get book by ID |
| PATCH | `/admin/book/:id` | Update book information |
| DELETE | `/admin/book/:id` | Delete book |

**Borrowing Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/borrowings` | Get all borrowed books |
| PUT | `/admin/borrowings/:bookId/return` | Force return a borrowed book |

**Contact Management**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/contact` | Get all contact requests |
| DELETE | `/admin/contact/:id` | Delete a contact request |

## Authentication

The API uses JWT (JSON Web Token) for authentication. After successful login or registration, a token is returned which must be included in the Authorization header for protected routes:

```
Authorization: Bearer <your_token_here>
```

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Start the server: `npm start`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Note: For Postman testing, update the environment variables for:
- `auth`: Your authentication service base URL
- `authors`: Your authors service base URL
- `books`: Your books service base URL
- `borrowings`: Your borrowings service base URL
- `admin`: Your admin service base URL
