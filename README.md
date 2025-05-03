# Realtime-chat-app

<div align="center">Connect and chat in real-time, with a modern and responsive interface.</div>

<div align="center">
  
[![last commit](https://img.shields.io/badge/last%20commit-october%202023-blue)](https://github.com/yourusername/Realtime-chat-app)
[![javascript](https://img.shields.io/badge/javascript-100.0%25-blue)](https://github.com/yourusername/Realtime-chat-app)
[![languages](https://img.shields.io/badge/languages-1-blue)](https://github.com/yourusername/Realtime-chat-app)

</div>

<div align="center">Built with the tools and technologies:</div>

<div align="center">
  
<!-- These technologies are confirmed to be used in the codebase -->
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

</div>

<div align="center">
  
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)](https://github.com/motdotla/dotenv)

</div>

## Screenshots

![Home Page](./image/homepage.png)
*Home Interface*

![Sign Up](./image/signuppage.png)
*Signup Interface*

![Sign In](./image/Signinpage.png)
*Signin Interface*

![Complete Profile](./image/completeprofilepage.png)
*Complete Profile Interface*

![Chat Interface](./image/chatpage.png)
*Realtime Chat Interface*

![Notifications](./image/notificationspage.png)
*Notifications Interface*

![Call Interface](./image/callapp.png)
*App Call Interface*

## Objective
This project aims to create a real-time chat application with the following goals:
1. Enable instant messaging between users
2. Support private and group conversations
3. Provide secure user authentication
4. Deliver a responsive and intuitive UI
5. Allow message history and media sharing

## Methodology
The system is built using the MERN stack:

### Backend Design
- **API**: Express.js handles RESTful endpoints for user and chat operations
- **Authentication**: JWT-based authentication secures user access
- **Database**: MongoDB stores user data and message history
- **Real-time**: Socket.IO enables instant message delivery
- **Validation**: Server-side validation ensures data integrity

### Frontend Design
- **Interface**: React with Tailwind CSS creates a responsive UI
- **State Management**: React Context API manages application state
- **Real-time**: Socket.IO client connects to the server
- **HTTP Requests**: Axios handles API communication

### Process
- User registers or logs in through the authentication system
- Backend validates credentials and issues JWT tokens
- Users can create chats, send messages, and receive real-time updates
- Messages are stored in MongoDB for persistence
- Frontend updates in real-time when new messages arrive

## Tools
- **Backend**: Node.js, Express, MongoDB, Mongoose, Socket.IO
- **Frontend**: React, Tailwind CSS, Axios, Socket.IO Client
- **Authentication**: JWT, bcrypt
- **Development**: Nodemon, Vite

## Features
1. Real-time messaging with typing indicators
2. User authentication and profile management
3. Private and group chat support
4. Message history persistence
5. Responsive design for mobile and desktop
6. Online status indicators
7. Read receipts
8. Media sharing capabilities

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## API Endpoints
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `GET /api/users`: Get all users
- `GET /api/chats`: Get user's chats
- `POST /api/chats`: Create a new chat
- `GET /api/messages/:chatId`: Get messages in a chat
- `POST /api/messages`: Send a new message

## Future Plans
1. Voice and video calling integration
2. End-to-end encryption
3. Push notifications
4. File sharing and cloud storage
5. Message search functionality

## License
MIT