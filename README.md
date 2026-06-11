# EnrollMesh

**EnrollMesh** is a full-stack student enrollment management system built with a React frontend and a Spring Boot REST API backend. It supports two user roles - **Admin** and **Student** - with a clean, role-based UI and a MySQL-backed data layer.

## Overview

EnrollMesh provides a centralised platform for managing students, academic modules, and enrolments.

- **Admins** can create, update, and delete student records and modules, and control which students are enrolled in which modules.
- **Students** can log in to view the modules they are currently enrolled in.

Public users (not logged in) can view the landing page and register as students.

---

## Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 21 | Language |
| Spring Boot | 3.4.12 | Application framework |
| Spring Data JPA | - | ORM / database access |
| MySQL | 8 | Relational database |
| Lombok | - | Boilerplate reduction |
| Maven | 3.9.11 | Build tool |
| Docker | - | Containerisation |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.0 | UI library |
| Vite | 7.2.4 | Build tool / dev server |
| React Router DOM | 7.10.0 | Client-side routing |
| Axios | 1.13.2 | HTTP client |

---

## Project Structure

```
EnrollMesh/
├── backend/
│   └── backend/
│       ├── Dockerfile
│       ├── pom.xml
│       ├── mvnw  /  mvnw.cmd
│       └── src/
│           ├── main/
│           │   ├── java/com/enrollmesh/backend/
│           │   │   ├── BackendApplication.java        # Entry point
│           │   │   ├── config/
│           │   │   │   └── CorsConfig.java            # CORS configuration
│           │   │   ├── controller/
│           │   │   │   ├── AuthController.java        # POST /api/auth/login|signup
│           │   │   │   ├── EnrollmentController.java  # POST|DELETE|GET /api/enrollments
│           │   │   │   ├── ModuleController.java      # CRUD /api/modules
│           │   │   │   └── StudentController.java     # CRUD /api/students
│           │   │   ├── dto/
│           │   │   │   ├── LoginRequest.java
│           │   │   │   ├── LoginResponse.java
│           │   │   │   └── SignupRequest.java
│           │   │   ├── entity/
│           │   │   │   ├── User.java                  # Admin + Student entity
│           │   │   │   └── Module.java                # Academic module entity
│           │   │   ├── repository/
│           │   │   │   ├── UserRepository.java
│           │   │   │   └── ModuleRepository.java
│           │   │   └── service/
│           │   │       ├── AuthService.java
│           │   │       ├── ModuleService.java
│           │   │       ├── StudentService.java
│           │   │       └── impl/
│           │   │           ├── AuthServiceImpl.java
│           │   │           ├── ModuleServiceImpl.java
│           │   │           └── StudentServiceImpl.java
│           │   └── resources/
│           │       └── application.properties
│           └── test/
│               └── java/.../BackendApplicationTests.java
│
└── frontend/
    └── enrollmesh-frontend/
        ├── index.html
        ├── package.json
        ├── vite.config.js
        ├── vercel.json                                # Vercel SPA rewrite config
        └── src/
            ├── App.jsx
            ├── main.jsx
            ├── index.css
            ├── components/
            │   ├── NavBar.jsx                         # Role-aware navigation bar
            │   ├── ProtectedRoute.jsx                 # Requires any valid login
            │   ├── AdminRoute.jsx                     # Requires admin role
            │   └── PublicRoute.jsx                    # Redirects logged-in users away
            ├── pages/
            │   ├── HomePage.jsx                       # Animated landing page
            │   ├── LoginPage.jsx
            │   ├── SignupPage.jsx
            │   ├── StudentsPage.jsx                   # Admin: list + delete students
            │   ├── AddStudentPage.jsx                 # Admin: create student
            │   ├── UpdateStudentPage.jsx              # Admin: edit student
            │   ├── ModulesPage.jsx                    # Admin: list + delete modules
            │   ├── AddModulePage.jsx                  # Admin: create module
            │   ├── EditModulePage.jsx                 # Admin: edit module
            │   ├── EnrollmentPage.jsx                 # Admin: manage enrolments per student
            │   └── EnrollmentModulesPage.jsx          # Student: view own enrolments
            ├── router/
            │   └── AppRouter.jsx                      # All route definitions
            └── Services/
                ├── AuthService.jsx                    # login, signup API calls
                ├── StudentService.jsx                 # student CRUD API calls
                └── ModuleService.jsx                  # module CRUD API calls
```

---

## Features

### Admin
- View, add, edit, and delete student records (name, email, department, year)
- View, add, edit, and delete academic modules (name, code, credits, department)
- Manage enrolments: select any student from a dropdown and toggle module enrolments using checkboxes in real time
- Role-based navigation bar (Home, Students, Modules, Enrollments, Logout)

### Student
- Register via the public Signup page (always assigned the `student` role)
- Log in and view a personalised "My Modules" page showing all currently enrolled modules
- Role-based navigation bar (Home, My Modules, Logout)

### Public
- View the landing page
- Access Login and Signup pages; redirected away from these if already logged in

---

## Architecture & Data Model

### Entities

**User** (`users` table)
| Column | Type | Notes |
|---|---|---|
| id | Long (PK) | Auto-generated |
| name | String | |
| email | String | Unique |
| password | String | Plain text - see [Known Limitations](#known-limitations) |
| role | String | `"admin"` or `"student"` |
| department | String | |
| year | String | |

**Module** (`modules` table)
| Column | Type | Notes |
|---|---|---|
| id | Long (PK) | Auto-generated |
| name | String | |
| code | String | |
| credits | int | |
| department | String | |

**Join Table** - `user_modules`
| Column | References |
|---|---|
| user_id | users.id |
| module_id | modules.id |

The `User` ↔ `Module` relationship is **Many-to-Many**. A student can be enrolled in multiple modules, and each module can have multiple students.

### Authentication

On login the backend returns a Base64-encoded token (`email:role`) and the user's role. The frontend stores `token`, `role`, and `email` in `localStorage` and uses them for route guarding. There is no server-side session validation on protected endpoints - see [Known Limitations](#known-limitations).

### CORS

The backend allows requests from `http://localhost:5173` (Vite dev server) and from whatever URL is set in the `FRONTEND_URL` environment variable (your production frontend URL).

---

## API Reference

All endpoints are prefixed with `/api`. The backend runs on port **8080** by default.

### Auth - `/api/auth`

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| POST | `/api/auth/login` | `{ email, password }` | `{ token, role }` | Authenticate a user |
| POST | `/api/auth/signup` | `{ name, email, password, department, year }` | `"Signup successful"` | Register a new student |

### Students - `/api/students`

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| GET | `/api/students` | - | `User[]` | Get all students |
| GET | `/api/students/{id}` | - | `User` | Get student by ID |
| POST | `/api/students` | `{ name, email, department, year }` | `User` | Create a student (role forced to `"student"`) |
| PUT | `/api/students/{id}` | `{ name, email, department, year }` | `User` | Update a student |
| DELETE | `/api/students/{id}` | - | - | Delete a student |

### Modules - `/api/modules`

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| GET | `/api/modules` | - | `Module[]` | Get all modules |
| GET | `/api/modules/{id}` | - | `Module` | Get module by ID |
| POST | `/api/modules` | `{ name, code, credits, department }` | `Module` | Create a module |
| PUT | `/api/modules/{id}` | `{ name, code, credits, department }` | `Module` | Update a module |
| DELETE | `/api/modules/{id}` | - | - | Delete a module |

### Enrollments - `/api/enrollments`

| Method | Endpoint | Body | Response | Description |
|---|---|---|---|---|
| POST | `/api/enrollments/{studentId}/{moduleId}` | - | `User` | Enrol a student in a module |
| DELETE | `/api/enrollments/{studentId}/{moduleId}` | - | `User` | Unenrol a student from a module |
| GET | `/api/enrollments/student/{studentId}` | - | `Module[]` | Get all modules a student is enrolled in |
| GET | `/api/enrollments/module/{moduleId}` | - | `User[]` | Get all students enrolled in a module |

---

## Environment Setup

### Backend - `backend/backend/`

The backend reads configuration from OS environment variables via `application.properties`. For local development, create a file named `.env` inside `backend/backend/` (used when running via Docker or an IDE that loads `.env` files), **or** export the variables directly in your shell before running with Maven.

**File location:** `EnrollMesh/backend/backend/.env`

```env
# MySQL connection
DATASOURCE_URL=jdbc:mysql://localhost:3306/enrollmesh_db
DATASOURCE_USER=your_mysql_username
DATASOURCE_PASSWORD=your_mysql_password

# URL of your frontend (used for CORS)
FRONTEND_URL=http://localhost:5173
```

> **Note:** Spring Boot does not natively load `.env` files when run with `./mvnw`. If you are running locally without Docker, either export the variables in your shell (`export DATASOURCE_URL=...`) or replace the `${...}` placeholders in `application.properties` directly for local development only. Never commit credentials to source control.

**For production / Docker**, pass these as environment variables to the container (see [Docker](#docker) section).

---

### Frontend - `frontend/enrollmesh-frontend/`

Vite reads environment variables from a `.env` file at the root of the frontend project.

**File location:** `EnrollMesh/frontend/enrollmesh-frontend/.env`

```env
# The base URL of your running backend API
VITE_API_URL=http://localhost:8080
```

For production, create a `.env.production` file in the same directory:

```env
VITE_API_URL=https://your-deployed-backend-url.com
```

> All frontend environment variables **must** be prefixed with `VITE_` to be exposed by Vite.

---

## Running Locally

### Prerequisites

- Java 21+
- Maven 3.9+ (or use the included `./mvnw` wrapper)
- Node.js 18+
- MySQL 8 running locally with a database created (e.g. `CREATE DATABASE enrollmesh_db;`)

### 1. Start the Backend

```bash
cd EnrollMesh/backend/backend

# Option A: Export env vars in shell, then run
export DATASOURCE_URL=jdbc:mysql://localhost:3306/enrollmesh_db
export DATASOURCE_USER=root
export DATASOURCE_PASSWORD=yourpassword
export FRONTEND_URL=http://localhost:5173
./mvnw spring-boot:run

# Option B: On Windows
set DATASOURCE_URL=jdbc:mysql://localhost:3306/enrollmesh_db
set DATASOURCE_USER=root
set DATASOURCE_PASSWORD=yourpassword
set FRONTEND_URL=http://localhost:5173
mvnw.cmd spring-boot:run
```

The API will be available at `http://localhost:8080`.

Hibernate will auto-create/update the tables (`spring.jpa.hibernate.ddl-auto=update`) on first run.

### 2. Create an Admin User

Signup via the app always creates a `student`. To create an admin, insert a row directly into the database:

```sql
INSERT INTO users (name, email, password, role, department, year)
VALUES ('Admin Name', 'admin@example.com', 'yourpassword', 'admin', 'Administration', '0');
```

### 3. Start the Frontend

```bash
cd EnrollMesh/frontend/enrollmesh-frontend

# Install dependencies
npm install

# Create your .env file (see Environment Setup above)
# Then start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Docker

The backend includes a multi-stage `Dockerfile`:

1. **Build stage** - uses `maven:3.9.11-eclipse-temurin-21` to compile and package the JAR
2. **Runtime stage** - uses `eclipse-temurin:21-jdk-jammy` to run the JAR

### Build and Run

```bash
cd EnrollMesh/backend/backend

# Build the image
docker build -t enrollmesh-backend .

# Run the container - pass environment variables at runtime
docker run -p 8080:8080 \
  -e DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/enrollmesh_db \
  -e DATASOURCE_USER=root \
  -e DATASOURCE_PASSWORD=yourpassword \
  -e FRONTEND_URL=http://localhost:5173 \
  enrollmesh-backend
```

Or use an `--env-file`:

```bash
docker run -p 8080:8080 --env-file .env enrollmesh-backend
```

> Use `host.docker.internal` (Mac/Windows) or your machine's LAN IP in `DATASOURCE_URL` when MySQL is running on the host, not inside Docker.

---

## Deployment

### Backend

The backend is containerised and can be deployed to any platform that supports Docker (Railway, Render, Fly.io, AWS ECS, etc.). Set the four environment variables (`DATASOURCE_URL`, `DATASOURCE_USER`, `DATASOURCE_PASSWORD`, `FRONTEND_URL`) in your platform's environment settings.

### Frontend

The frontend is pre-configured for **Vercel**. The `vercel.json` contains a catch-all SPA rewrite rule so that React Router client-side routes resolve correctly:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

To deploy:

1. Push the `frontend/enrollmesh-frontend` directory (or the whole repo) to GitHub.
2. Import the project in [vercel.com](https://vercel.com).
3. Set the **Root Directory** to `frontend/enrollmesh-frontend`.
4. Add the environment variable `VITE_API_URL` pointing to your deployed backend URL.
5. Deploy.

---

## Screenshots / Pages

| Route | Access | Description |
|---|---|---|
| `/` | Public | Animated landing page with feature overview |
| `/login` | Public (unauthenticated only) | Login form |
| `/signup` | Public (unauthenticated only) | Student registration form |
| `/my-modules` | Student only | Table of enrolled modules |
| `/Students` | Admin only | List all students with Edit / Delete actions |
| `/Students/add` | Admin only | Form to create a new student |
| `/edit-student/:id` | Admin only | Pre-filled form to update a student |
| `/modules` | Admin only | List all modules with Edit / Delete actions |
| `/modules/add` | Admin only | Form to create a new module |
| `/edit-module/:id` | Admin only | Pre-filled form to update a module |
| `/enrollments` | Admin only | Dropdown to select a student; checkbox per module to enrol/unenrol in real time |

---

## Production Considerations

> This project was built as a portfolio/learning application. The following improvements are identified and planned before any production release.

- **Password Hashing** - Passwords are currently stored in plain text. Planning to integrate Spring Security's `PasswordEncoder` with BCrypt to securely hash and verify credentials.

- **JWT Authentication** - The current token is a Base64-encoded `email:role` string with no server-side verification. Planning to replace this with a proper JWT implementation using `spring-boot-starter-security` and `jjwt` for signed, expirable tokens.
