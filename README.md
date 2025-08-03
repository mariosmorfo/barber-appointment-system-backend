# 💈Barber Appointment Booking API

This is a RESTful API built with Node.js, Express, and MongoDB that allows users and barbers to manage appointments in a barber shop system. The project includes user authentication, role-based access control 
(Admin, Barber, Customer), and structured CRUD operations for Users, Barbers, and Appointments.

## Project Structure

├── controllers/ # Business logic for each model
│   ├── appointment.controller.js
│   ├── auth.controller.js
│   ├── barber.controller.js
│   └── user.controller.js
├── models/ # Mongoose schemas and models
│   ├── appointment.model.js
│   ├── barber.model.js
│   └── user.model.js
├── routes/ # All Express routes
│   ├── appointment.routes.js
│   ├── auth.routes.js
│   ├── barber.routes.js
│   └── user.routes.js
├── middlewares/ # Middleware for auth and roles
│   └── auth.middleware.js
├── services/ # JWT service for token creation & validation
│   └── auth.service.js
├── logger/ # Winston logger configuration
│   └── logger.js

├── logs/ # Generated logs (info, error, warn, daily rotate)

├── swagger.js # Swagger OpenAPI spec configuration

├── app.js # Main Express app config

├── server.js # Entry point to start the server

├── .env # Environment variables

└── README.md # Project documentation


## ✨Features 

- User and Barber registration & login (JWT based)

- Role-based access control (Admin, Barber, Customer)

- Appointment creation, cancellation, and status update

- CRUD operations for Users and Barbers

- Input validation and password hashing (bcrypt)

- Request logging with Winston + MongoDB transport

- API documentation via Swagger UI

## 🔐 Authentication & Roles

### JWT tokens are used for secure access

## Roles & Permissions:

  ADMIN:
    - Full administrative access
    - Can create, update, or delete both barbers and users
    - Can view all appointments

  BARBER:
    - Can view appointments assigned to them
    - Can update appointment statuses (e.g. mark as completed or cancelled)

  CUSTOMER:
    - Can book new appointments with barbers
    - Can view their own appointment history
    - Can cancel their upcoming appointments

## Clone the Repository

git clone <git@github.com:mariosmorfo/barber-appointment-system-backend.git>

cd <barber-appointment-system-backend.git>

## Install Dependencies

npm install

## Create .env File

MONGODB_URI = your-mongodb-uri

JWT_SECRET = your-jwt-secret

## Run the Application 

npm run dev

## 📘 API Documentation

http://localhost:3000/api-docs


