const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routers/routes");
const cors = require("cors");
const path = require("path");

// Load .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Middlewares
// Remove global body parsing - let routes handle it individually
// (multer needs raw request stream for multipart/form-data)




// CORS configuration - PUT THIS IN YOUR MAIN SERVER FILE
app.use(cors({
  origin: [
    "https://react-alos-interiors-app-1.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
}));




// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/", userRoute);
console.log("✅ Routes mounted at /");

app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});


// Port for Render
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Current directory: ${__dirname}`);
});