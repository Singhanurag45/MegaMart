MegaMart: Full-Stack E-Commerce Platform
MegaMart is a feature-rich, full-stack e-commerce project designed to showcase a complete MERN (MongoDB, Express.js, React, Node.js) application workflow. It provides a seamless shopping experience with features like dynamic product catalogs for men, women, and kids, an interactive shopping cart, and secure user authentication using JWT for registration and login.


✨ Features
Responsive UI: Modern and clean user interface built with Tailwind CSS.

Product Catalogs: Browse products on the homepage and dedicated category pages (Men, Women, Kids).

Product Details: View detailed information for each product.

Dynamic Shopping Cart: Add, remove, and update the quantity of items in the cart.

User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).

RESTful API: A robust backend API built with Node.js and Express for managing products and users.

Image Uploads: Product images are handled using Multer for file uploads.

📸 Screenshots
Here are some glimpses of MegaMart in action:

### 🏠 Home Page
![HomePage](ScreenShots/HomePage.png)

### 👶 Kids Section
![Kids](ScreenShots/kids.png)

### 📝 Sign Up
![SignUp](ScreenShots/SignUp.png)

### 🛒 Cart Page
![Cart](ScreenShots/Cart.png)

### 📌 Footer
![Footer](ScreenShots/Footer.png)


🛠️ Tech Stack
Frontend: React, Vite, React Router, Axios, Tailwind CSS, Lucide React

Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Authentication: JSON Web Token (JWT), bcryptjs

Deployment: Render (Static Site + Web Service)

🚀 Getting Started
Follow these instructions to set up the project locally on your machine.

Prerequisites
Node.js (v18 or later)

MongoDB (local installation) or a MongoDB Atlas account.

Installation & Setup
Clone the repository:

Bash

git clone https://github.com/your-username/megamart.git
cd megamart
Setup the Backend:

Bash

# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Create a .env file and add your environment variables
# (see the .env.example section below)
touch .env

# Start the backend server
npm run dev
Setup the Frontend:

Bash

# Navigate to the frontend folder from the root directory
cd frontend

# Install dependencies
npm install

# Create a .env file and add your environment variables
touch .env

# Start the frontend development server
npm run dev
Environment Variables
You need to create a .env file in both the backend and frontend directories.

backend/.env

Code snippet

# Your MongoDB connection string (local or from Atlas)
MONGO_URI=mongodb://127.0.0.1:27017/MegaMart

# A long, random string for signing JWTs
JWT_SECRET=your_super_secret_jwt_key
frontend/.env

Code snippet

# The URL where your backend server is running
VITE_API_URL=http://localhost:5000/api
📝 API Endpoints
The backend provides the following RESTful API endpoints:

Auth Routes (/api/auth)
POST /signup: Register a new user.

POST /login: Log in an existing user and get a JWT.

POST /logout: Confirms user logout (client-side token removal).

Product Routes (/api/products)
GET /: Get all products.

GET /:id: Get a single product by its ID.

POST /: Create a new product (requires image upload).

PUT /:id: Update an existing product.

DELETE /:id: Delete a product.

✒️ Author
Anurag Singh

LinkedIn: https://www.linkedin.com/in/anurag-singh-9598b4207/
