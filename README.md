# Barber Appointment Booking API

This is a RESTful **backend API** built with Node.js, Express, and MongoDB that allows users and barbers to manage appointments in a barber shop system. 
The project includes user authentication, role-based access control (Admin, Barber, Customer), 
and structured CRUD operations for Users, Barbers, and Appointments.


##  Technologies Used

| Technology         | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Node.js**        | JavaScript runtime environment for executing server-side code               |
| **Express.js**     | Minimal and flexible web application framework for building REST APIs       |
| **MongoDB**        | NoSQL database used for storing users, appointments, and barbers            |
| **Mongoose**       | ODM (Object Data Modeling) library for MongoDB and Node.js                  |
| **JWT (jsonwebtoken)** | Used for secure authentication and authorization using access tokens    |
| **Bcrypt**         | Library for hashing passwords securely before saving them to the database   |
| **CORS**           | Middleware to allow cross-origin requests between frontend and backend      |
| **Winston**        | Logging library for handling logs, including daily rotation and MongoDB logs|
| **Swagger (OpenAPI)** | Provides interactive API documentation and testing interface             |

## Features 

- User and Barber registration & login (JWT based)

- Role-based access control (Admin, Barber, Customer)

- Appointment creation, cancellation, and status update

- CRUD operations for Users and Barbers

- Input validation and password hashing (bcrypt)

- Request logging with Winston + MongoDB transport

- API documentation via Swagger UI

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

git clone git@github.com:mariosmorfo/barber-booking-app-backend.git

cd barber-booking-app-backend

## Install Dependencies

npm install

## Create .env File

MONGODB_URI = your-mongodb-uri

JWT_SECRET = your-jwt-secret

## Run the Application 

npm run dev

## API Documentation

http://localhost:3000/api-docs


