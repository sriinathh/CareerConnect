# CareerConnect — REST API Specification

This document details the RESTful API endpoints for **CareerConnect**, adhering to semantic HTTP methods, standardized response bodies, and token-based authentication.

---

## 1. Global API Conventions

### 1.1. Base URL & Versioning
All REST endpoints are namespaced under the `/api/v1` prefix:
```text
http://localhost:8080/api/v1
```

### 1.2. Authentication Header
All protected endpoints require a valid JSON Web Token passed in the `Authorization` header:
```http
Authorization: Bearer <your_jwt_token>
```

### 1.3. Standard Response Format (`ApiResponse<T>`)
Every successful API response returns a uniform JSON structure:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2026-10-29T18:30:00Z"
}
```

### 1.4. Standard Error Format (`ErrorResponse`)
Error responses follow RFC 7807 principles:
```json
{
  "timestamp": "2026-10-29T18:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed for one or more fields",
  "path": "/api/v1/auth/register",
  "fieldErrors": [
    {
      "field": "email",
      "rejectedValue": "invalid-email",
      "message": "Must be a well-formed email address"
    }
  ]
}
```

---

## 2. API Endpoints Directory

### 2.1. System & Health
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Public | Returns API service health, version, and server timestamp. |
| `GET` | `/actuator/health` | Public | Spring Boot Actuator health check (DB connectivity, disk space). |

---

### 2.2. Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register new user (Student or Recruiter). |
| `POST` | `/api/v1/auth/login` | Public | Authenticate with email & password, returns JWT and user roles. |
| `GET` | `/api/v1/auth/me` | Authenticated | Fetch current authenticated user principal and profile status. |

#### Example Login Request:
```json
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "student@college.edu",
  "password": "Password@123"
}
```

#### Example Login Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400000,
    "user": {
      "id": "c3b7a58a-3642-4f3b-b6d8-111111111111",
      "email": "student@college.edu",
      "firstName": "Arun",
      "lastName": "Kumar",
      "roles": ["ROLE_STUDENT"]
    }
  },
  "timestamp": "2026-10-29T18:30:00Z"
}
```

---

### 2.3. Jobs (`/api/v1/jobs`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/jobs` | Public | Search & list active jobs with pagination (`page`, `size`, `keyword`, `location`, `employmentType`). |
| `GET` | `/api/v1/jobs/{id}` | Public | Get single job details by ID. |
| `POST` | `/api/v1/jobs` | Recruiter | Create a new job posting. |
| `PUT` | `/api/v1/jobs/{id}` | Recruiter (Owner) | Update an existing job posting. |
| `DELETE`| `/api/v1/jobs/{id}` | Recruiter (Owner) | Archive/close a job posting. |

---

### 2.4. Job Applications (`/api/v1/applications`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/applications` | Student | Apply to a job posting with selected resume ID and cover letter. |
| `GET` | `/api/v1/applications/my` | Student | List applications submitted by current student. |
| `GET` | `/api/v1/applications/job/{jobId}` | Recruiter (Owner) | List applicants for a specific job posting. |
| `PATCH`| `/api/v1/applications/{id}/status`| Recruiter (Owner) | Update applicant hiring status (`SHORTLISTED`, `INTERVIEW_SCHEDULED`, etc.). |

---

### 2.5. Student Profiles & Resumes (`/api/v1/students`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/students/me` | Student | Retrieve own student profile. |
| `PUT` | `/api/v1/students/me` | Student | Update profile details (academics, skills, social links). |
| `POST` | `/api/v1/students/resumes` | Student | Upload a new PDF/DOCX resume file (multipart/form-data). |
| `GET` | `/api/v1/students/resumes` | Student | List all uploaded resumes for student. |
| `DELETE`| `/api/v1/students/resumes/{id}` | Student | Delete a resume. |

---

### 2.6. Admin Governance (`/api/v1/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/users` | Admin | Paginated user management list with role filtering. |
| `PATCH`| `/api/v1/admin/users/{id}/status` | Admin | Toggle user active/suspended state. |
| `GET` | `/api/v1/admin/recruiters/pending` | Admin | List recruiter accounts pending institutional verification. |
| `POST` | `/api/v1/admin/recruiters/{id}/verify`| Admin | Approve or reject recruiter verification. |
| `GET` | `/api/v1/admin/analytics/overview` | Admin | Retrieve placement statistics (total students, total jobs, placement rate). |
