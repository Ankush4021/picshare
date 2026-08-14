PicShare 📸

A full-stack photo-sharing app where users can upload an image with a caption, view all posts in a feed, and delete their own posts. Built with the MERN stack.

✨ Features
Upload an image + caption to create a post
Live image preview before uploading, with an option to change the selected image
Feed page showing all posts in a responsive grid layout
Delete any post from the feed
Success / error feedback message after creating a post
Simple navigation bar to switch between Feed and Create Post pages
🛠️ Tech Stack

Frontend

React
React Router (page navigation)
Axios (API calls)
Plain CSS

Backend

Node.js + Express
MongoDB with Mongoose
Multer (image upload handling)

📁 Folder Structure
Project1/
├── Backend/
│   ├── models/
│   ├── routes/
│   ├── uploads/          # locally stored images (dev only)
│   ├── index.js
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Feed.jsx
    │   │   └── CreatePost.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

☁️ Deployment
Frontend — deployed on Vercel
Backend — deployed on Render
Database — hosted on MongoDB Atlas

📌 Notes
This project was built as a learning exercise while practicing the MERN stack.
Image storage currently uses local disk via Multer in development — for production, consider using a cloud storage service (e.g. Cloudinary) since hosting platforms like Render don't persist local files across restarts.
👤 Author

Ankush Kumar
