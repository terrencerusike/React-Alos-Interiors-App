const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// Load environment variables first
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// ===== Middlewares =====
app.use(cors({
  origin: [
    "https://react-alos-interiors-app-1.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ⚡ BODY PARSERS MUST COME BEFORE ROUTES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ===== Routes =====
const userRoute = require("./routers/routes");
app.use("/", userRoute);


// Test root
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});

// Connect to MongoDB (after middleware/routes)
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// ===== Start server =====
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
