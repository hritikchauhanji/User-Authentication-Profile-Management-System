# Assignment 2 — User Authentication & Profile Management System

**Author:** Hritik Chauhan  

---

## 1. Executive Summary

This project implements a complete **User Authentication and Profile Management System** using the MERN stack (MongoDB, Express, React, Node.js).  
The system allows users to register, log in, view and update their profile, upload profile pictures, and reset their password using OTP-based email verification.  
It uses **JWT** for authentication, **bcrypt** for password hashing, and **Nodemailer** for sending emails.

---

## 2. Objectives

- Implement a secure and efficient user authentication flow.  
- Learn backend authentication systems, frontend API integration, and database schema management.  
- Enable profile management, including updating personal details and profile images.  

---

## 3. Technologies Used

- **Frontend:** React.js (Create React App)  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB  
- **Authentication:** JSON Web Tokens (JWT)  
- **Email Service:** Nodemailer (SMTP - Gmail)  
- **Image Upload:** Cloudinary or local uploads  
- **Password Encryption:** bcryptjs  
- **Other Tools:** dotenv, multer, axios, Spline (3D animation)

---

## 4. Project Structure

```
Assignment_2/
├─ backend/
│ ├─ config/db.js
│ ├─ middleware/
│ ├─ models/User.js
│ ├─ routes/userRoutes.js
│ ├─ utils/mailer.js
│ └─ server.js
├─ frontend/
│ ├─ src/pages/
│ ├─ src/components/
│ └─ src/api/axiosInstance.js
└─ .env.sample
```

---

## 5. Installation & Setup

1. Install Node.js and MongoDB.  
2. Navigate to the **backend** folder and install dependencies:
   ```bash
   npm install
3. Create a .env file in the backend folder using .env.sample as a reference.
4. Start the backend server:
   ```bash
   npm run dev
5. Navigate to the frontend folder, install dependencies, and start React:
   ```bash
   npm install
   npm start
6. Frontend runs on http://localhost:3000 and backend on http://localhost:3001.

---

## 6. Features
  User Registration and Login (JWT-based authentication)
  Profile View and Edit
  Profile Picture Upload
  Forgot Password and Reset Password with OTP
  Token verification middleware
  Secure password storage using bcrypt

---

## 7. API Endpoints
  Base URL: http://localhost:3001/api/v1/auth
  | Endpoint           | Method | Description                       |
| ------------------ | ------ | --------------------------------- |
| `/register`        | POST   | Register a new user               |
| `/login`           | POST   | Authenticate user and return JWT  |
| `/profile`         | GET    | Retrieve user profile (Protected) |
| `/profile`         | PUT    | Update profile details            |
| `/upload`          | POST   | Upload profile image              |
| `/forgot-password` | POST   | Send OTP to email                 |
| `/reset-password`  | POST   | Reset password using OTP          |

## 8. Database Schema (User)
  ```
  {
    "name": "String",
    "email": "String (unique)",
    "password": "String (hashed)",
    "profileImage": "String (image URL)",
    "refreshToken": "String",
    "resetOtpHash": "String",
    "resetOtpExpiresAt": "Date",
    "createdAt": "Date"
  }
```

---

## 9. Security Features
  Passwords hashed using bcrypt before saving.
  JWT is used for sessionless authentication.
  OTP is hashed before storing in the database.
  Rate limiting prevents brute-force OTP requests.
  CORS allows only frontend origin access.

---

## 10. Testing Instructions

Use Postman or curl to test endpoints. Example:
```
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"Pass123"}'
```

---

## 11. Challenges & Learnings
  Challenges: Managing JWT tokens, configuring Nodemailer with Gmail, setting up CORS.
  Learnings: JWT-based authentication, secure password management, frontend-backend integration using Axios.

---

## 12. Future Improvements
  Google OAuth login
  Email verification on registration
  Enhanced UI/UX
  Logging and monitoring using Winston or Morgan

---

## 15. Conclusion
  This project demonstrates the implementation of a secure and functional authentication system for modern web applications using the MERN stack.
  It integrates frontend and backend seamlessly, ensuring a smooth user experience with secure data handling.

---
 
Do you want me to do that next?
