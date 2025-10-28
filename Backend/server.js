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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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