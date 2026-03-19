# ReviewHub

ReviewHub is a review platform where users can explore local businesses and share their experiences through ratings and reviews. The project allows users to search, filter, and view businesses, as well as read and submit reviews. Admin users can approve or reject 
reviews before they are published. 

# Key Features

## User Features

- User registration and login authentication
- Browse and explore local businesses
- Search businesses by category, city, or keywords
- Submit reviews with structured ratings
- Upload photos with reviews
- View ratings and feedback from other users
- Update user profile information

## Business Features

- Business listing and management system
- Categorization of businesses
- Search and filtering functionality
- Aggregated rating calculation
- Business detail pages with review statistics

## Admin Features

- Review moderation system
- Approve or reject reviews
- Manage businesses on the platform
- Monitor pending review submissions

---

# Technology Stack

## Frontend

- React
- JavaScript
- CSS

## Backend

- Node.js
- Express.js
- RESTful API architecture

## Database

- Supabase 

## Authentication and Security

- JWT authentication
- Password hashing using bcrypt
- Role based authorization (User / Admin)

---

Navigate to the project directory

cd reviewPlatform

Install dependencies

npm install

Start the development server

npm start

The frontend application will run at:

http://localhost:3000
Backend Setup

Navigate to the backend folder

cd backend

Install backend dependencies

npm install

Create a .env file and add the following environment variables

PORT=5000
NODE_ENV=development

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

JWT_SECRET=your_secret_key
JWT_EXPIRE=30d

Start the backend server

npm run dev

---

# Contribution

Contributions are welcome. If you would like to improve the project, fix bugs, or add new features, feel free to fork the repository and submit a pull request.

Please ensure that your code follows the existing project structure and coding standards.

---
