# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System designed as a full-stack coding assignment.  
The application allows an admin to manage employee records and track attendance through a clean, professional web interface.

The focus of this project is:
- Clean frontend UI
- Well-structured backend APIs
- Proper database persistence
- Error handling and validations
- Dockerized, production-ready setup

---

## ✨ Features

### Employee Management
- Add a new employee
- View all employees
- Delete an employee
- Server-side validation (required fields, email format, duplicate handling)
- Clean UI with loading, empty, and error states

### Attendance Management
- Mark attendance (Present / Absent) per employee
- View attendance records per employee

### General
- RESTful API design
- Proper HTTP status codes
- Meaningful error messages
- Reusable frontend components
- Dockerized setup for local development

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript (JSX)
- React Router DOM
- Axios
- Plain CSS (clean, minimal, professional)

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic

### Database
- PostgreSQL

### DevOps / Deployment
- Docker
- Docker Compose

---
## 📂 Project Structur
HRMS-Lite/
│
├── docker-compose.yml
│
├── hrms-backend/
│ ├── Dockerfile
│ ├── requirements.txt
│ └── app/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── schemas.py
│ └── routers/
│
└── frontend/
├── Dockerfile
├── package.json
└── src/
├── components/
├── pages/
├── services/
├── routes/
└── styles/

---

## ⚙️ Environment Variables

### Frontend (`.env`)
``env
VITE_API_URL=http://localhost:8000
DATABASE_URL=postgresql://postgres:postgres@db:5432/hrms
▶️ Running the Project Locally (Docker)
Prerequisites

Docker

Docker Compose

Steps

1. Clone the repository:
  ~~~
    git clone https://github.com/your-username/HRMS-Lite.git
    cd HRMS-Lite
  ~~~
2. Build and start services:
 ~~~
  docker compose build
  docker compose up
  ~~~
4. Access the application:
~~~
  Frontend: http://localhost:5173
  Backend API: http://localhost:8000/docs
~~~
🔄 Rebuilding Only Frontend (During Development)
~~~
  docker compose stop frontend
  docker compose rm -f frontend
  docker compose build --no-cache frontend
  docker compose up
~~~
🧪 API Documentation

FastAPI provides interactive API docs:
http://localhost:8000/docs
---
🚀 Deployment
The application is fully Dockerized and ready for deployment.

Recommended deployment platforms:

Frontend: Railway
Backend: Railway
Database: Managed PostgreSQL (Railway)

Note: The frontend must be configured with the live backend API URL during deployment.

---

📌 Assumptions & Limitations

1.Single admin user (no authentication)
2.Payroll, leave management, and advanced HR features are out of scope
3.Basic attendance tracking only
4.Focus is on core functionality, not over-engineering

---

🏆 Bonus Features 

1.Filter attendance by date
2.Display total present days per employee

---

📎 Submission Checklist

✅ Live Frontend URL
✅ Live Backend API
✅ GitHub Repository (frontend + backend)
✅ Dockerized setup
✅ Clean UI & stable functionality

---

🙌 Author

Kartik Sharma

---

📄 License

This project is created for evaluation and learning purposes.

---
