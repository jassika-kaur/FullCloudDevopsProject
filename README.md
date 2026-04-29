# MERN E-Commerce Website

A fully responsive, modern e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Modern, Premium UI**: Beautiful design using vanilla CSS with custom properties, smooth transitions, and dynamic effects.
- **Responsive**: Fully responsive design for mobile, tablet, and desktop.
- **Product Listing & Details**: Browse products and view detailed information.
- **Shopping Cart**: Add products to cart, update quantities, and remove items (persisted to local storage).
- **Backend API**: Express server serving product data.

## Getting Started

You will need two separate terminal windows to run this application:

### 1. Start the Backend Server
```bash
cd backend
npm install
node server.js
```
The backend server will run on `http://localhost:5000`.

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
The frontend will typically run on `http://localhost:5173`.

## Database (MongoDB)
Currently, the backend uses mocked product data for easy testing without setup. 
To connect to a real MongoDB database:
1. Open `backend/server.js`.
2. Uncomment the `mongoose.connect(...)` block.
3. Replace the connection string with your MongoDB URI, or add a `.env` file in the `backend` folder with `MONGO_URI=your_connection_string`.

## Technologies Used
- **Frontend**: React (Vite), React Router Dom, Axios, Lucide React (for icons)
- **Backend**: Node.js, Express, Mongoose, Cors, Dotenv
- **Styling**: Vanilla CSS (Custom Design System)
