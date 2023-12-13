# MessagingApp

Build a full-stack web application for sending and receiving messages.

## Table of contents

- [Objectives](#Objectives)
- [Instructions](#Instructions)

## Objectives

### Backend (Node.js)

Create a Node.js server that exposes RESTful APIs for the following operations:
- Register a new user (username and password).
- Authenticate users.
- Send a message to another user.
- Retrieve a list of messages for the authenticated user.
- Store everything in memory (no need to setup a db)

### Frontend (React)

Create a React application with the following components:
- LoginForm: Allow users to log in with their username and password.
- RegistrationForm: Allow users to register with a new username and password.
- ChatWindow: Display a chat where all users can write and receive messages.
- Use React Router to navigate between the login/registration page and the main chat
interface.
- Connect the React frontend to the Node.js backend to perform user authentication and message retrieval.
- <b>Bonus</b>: Implement real-time updates for new messages using WebSocket or a similar technology. (refreshing the page to see messages is an acceptable solution)

### Submission:
Share the source code via a GitHub repository. Include a README file with instructions on how to run the application locally.

#### Evaluation Criteria:
- Code structure and organization.
- Proper usage of Node.js for backend development.
- Effective use of React for frontend development.
- User authentication implementation.
- Error handling and validation.
- UI/UX and overall application design.
- Bonus points for implementing real-time updates.

## Instructions

To clone the repository locally, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command:
  ```bash
  git clone https://github.com/Nikire/MessagingApp
  ```
4. Once the cloning process is complete, navigate into the cloned directory:
  ```bash
  cd MessagingApp
  ```
5. Follow the backend and frontend setup instructions in their respective sections to set up the development environment.

### Backend setup

To set up the Backend development environment, follow these steps:

1. Navigate to the `Backend` directory:
  ```bash
  cd Backend
  ```

2. Install the required dependencies:
  ```bash
  npm install
  ```

3. Start the Backend server:
  ```bash
  npm start
  ```

The backend server will start running on the port 3001, and you can now proceed with the frontend setup.

### Frontend setup

To set up the Backend development environment, follow these steps:

1. Navigate to the `frontend` directory:
  ```bash
  cd frontend
  ```

2. Install the required dependencies:
  ```bash
  npm install
  ```

3. Start the Frontend server:
  ```bash
  npm start
  ```

The frontend server will start running on the port 3000.

**NOTE** Please take in care that both servers need to run at the same time to work properly