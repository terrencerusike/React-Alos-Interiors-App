const express = require("express");
const app = express();
const mongoDB =  require("mongoose")
const userRoute = require("./routers/routes");
const cors = require("cors")



// Load .env first
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to MongoDB
mongoDB.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userRoute);
app.use("/uploads", express.static("uploads"));
const path = require("path");



// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//route
app.get("/", (req, res) => {
  res.send("this is working");
});

const PORT = 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});