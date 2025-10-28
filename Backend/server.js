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
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("❌MongoDB connection error:", err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (keep above React routes)
app.use("/api", userRoute);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React routing: serve index.html for all other routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});


// Port for Render
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
