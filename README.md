# Dynamic User Availability and Event Scheduling System

This is a web-based application for dynamic user availability and event scheduling, built using **React.js** for the frontend and **Node.js** with **MongoDB** for the backend. The application allows users to set their availability, manage schedules, and participate in events. The admin has additional control over the application and user management.


### Backend

The backend is built using **Node.js** and **Express** with **MongoDB** as the database. Key components include:

- **User and Session Management**: Handles user registration, authentication, and session creation. Users can be either regular users or admins.
- **Availability Management**: Allows users to set their availability in time slots.
- **Role-Based Access Control (RBAC)**: Controls access to different APIs based on user roles (admin or user).
- **Authentication**: JWT-based authentication is used to secure the APIs.

### Frontend

The frontend is developed using **React.js** with **TailwindCSS** for styling. It provides a dynamic and responsive user interface, with key pages and components including:

- **Login Page**: Handles both user and admin logins.
- **Dashboard**: Displays user or admin dashboards based on the logged-in role.
- **Availability Page**: Allows users to set and manage their availability.
- **Message Component**: Displays feedback messages (e.g., success, error) in a modal or toast format.

### Database

- **MongoDB**: Used to store user information, availability slots, sessions, and event data.
- **Schemas**:
  - **User**: Stores user details and role information.
  - **Availability**: Stores user availability, including days and time slots.
  - **Session**: Stores information related to user sessions, participants, and event times.

## Design Choices

1. **Technology Stack**:
   - **Frontend**: React.js and TailwindCSS were chosen for building a dynamic and responsive user interface. React.js is component-based and scalable for future expansion.
   - **Backend**: Node.js and Express were used for building a RESTful API. MongoDB was chosen for its flexibility in handling dynamic user data such as availability slots.
   
2. **Role-Based Access Control (RBAC)**:
   - Implemented RBAC to differentiate between regular users and admin users. This ensures that specific APIs can only be accessed by the appropriate roles.

3. **JWT Authentication**:
   - JWT tokens are used for securing API endpoints, making the application stateless and scalable. The `authenticateToken` middleware checks the validity of the token before processing any request.

4. **Component-Based Frontend**:
   - The frontend was designed using reusable React components, which helps in maintaining a consistent UI throughout the application.

## Setup Instructions

### Prerequisites

- **Node.js** (version >= 14.x)
- **MongoDB** (version >= 4.x)
- **npm** (version >= 6.x)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NIKHIL-PALL/Booking-System.git
   cd Booking-System/backend
2. **Install Dependecies** :
    ```bash
    npm install
3. **Create a .env file in the backend folder and configure the following environment variables**:
    ```bash
    MONGO_URL=mongodb://localhost:27017/your-database-name
    ACCESS_TOKEN=your-jwt-secret
    PORT=5000
    USER = user
4. **Run the backend server**:
    ```bash
    npm run dev

## Frontend Setup

1. **Navigate to the frontend folder**:
    ```bash
    cd ../frontend
2. **Install dependencies** :
    ```bash
    npm install
3. **Run the frontend**:
    ```bash
    npm run start

    The frontend will run on http://localhost:3000

## API Documentation
The API follows RESTful principles and uses the following key endpoints:

1. **User/Admin APIs**:
    ```bash
    GET /api/user/ : get all users
    GET /api/user/:userId : get user by userId
    POST /api/user/signup: Register a new user.
    POST /api/user/login: Log in a user and receive a JWT token.
2. **Session APIs**:
    ```bash
    GET /api/session/ : get all sessions 
    GET /api/session/:userId: Get all sessions for a user.
    GET /api/session/:sessionId: Get a session by sessionId
    POST /api/session/: Create a new session.
    POST /api/session/addUser: Add a new user to the session
    DELETE /api/session/delete/:sessionId : Delete session by sessionId
3. **Availability APIs**:
    ```bash
    GET /api/slot/:userId: Get availability slots for a user.
    POST /api/slot/create: Create new availability slots for a user.
    PATCH /api/slot/: Update slot
    DELETE /api/slot/index: Delete a specific availability slot.
