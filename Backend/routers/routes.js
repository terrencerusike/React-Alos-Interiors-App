const express = require("express");
const router = express.Router();
const userSchema = require("../models/userSchema");
const category = require("../models/categorySchema");
const productDatabase = require("../models/productSchema");
const hashED = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const middlewareprotect = require("../middleware/middleware");

// Body parsing middleware for JSON/urlencoded routes
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});




//SIGN UP ROUTER
router.post("/signup", jsonParser, async(req, res) => {
  try{
    const passwordHashED = await hashED.hash(req.body.password, 10)
    const input = await userSchema.create({
      name:req.body.name, 
      email:req.body.email,  
      password: passwordHashED})
    if(!input){
   return  res.status(400).json({message: "Input not valid"})
  
      }
      res.status(200).json(input)
    

  }catch(err){
  return res.status(500).json({message: "Server Error"})
  }
});


//LOGIN ROUTER
router.post("/login", jsonParser, async(req, res)=>{
  try{
   const{email, password} = req.body
 const getEmail = await userSchema.findOne({email})

 if(!getEmail){
  return res.status(400).json({message : `Email not found`})
 }
 const passwordC = await hashED.compare(password, getEmail.password)
  if(!passwordC){ 
   return res.status(400).json({message: "Invalid Password"})
  }

  const token = jwt.sign(
    {id: getEmail._id}, 
    process.env.JWT_SECRET,
     {expiresIn: '1h'})

  return res.status(200).json({token})
  
  
}catch(err){
 return res.status(500).json({message: "Server Error"})
}


})

//Middleware

router.get("/cart", middlewareprotect, (req, res)=>{
  res.send("this is working");
});



//ADD CATEGORY ROUTER
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null; // optional image

    if (!name) {
      return res.status(400).json({ message: "Missing name" });
    }

    const saveCat = await category.create({ 
      name,
      ImageUrl: image ? `uploads/${image}` : null
    });

    if (!saveCat) {
      return res.status(400).json({ message: "Category not saved" });
    }

    res.status(200).json({ message: "Category saved successfully", data: saveCat });
  } catch (err) {
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});



//GET CATEGORY ROUTER

router.get("/categories", async (req, res) => {
  try {
    const catList = await category.find();
    console.log(catList);

    if (!catList || catList.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    return res.status(200).json(catList);
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err.message}` });
  }
});


// DELETE CATEGORY
router.delete("/catdelete/:id", async (req, res) => {
  try {
    const { id } = req.params; // get the category ID from the URL

    const deletedCategory = await category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



// Get products by category
router.get("/product/category/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const products = await productDatabase.find({ category: categoryName });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//ADD PRODUCT ROUTER
router.post("/productpost", upload.single("image"), async (req, res) => {
  try {
    const { productname, description, price, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!productname || !description || !price) {
      return res.status(400).json({ 
        message: "Missing required fields",
        received: { productname, description, price, category }
      });
    }

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const addProduct = await productDatabase.create({
      productname,
      description,
      price,
      category,
      imageUrl: image ? `uploads/${image}` : null
    });

    res.status(200).json(addProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});



//Delete PRODUCT
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedProduct = await productDatabase.findByIdAndDelete(id);
    console.log(deletedProduct)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});




//GET PRODUCT ROUTER
router.get("/productget", async(req, res)=>{
  try{
    const findProduct = await productDatabase.find().sort({ createdAt: -1 });
    if(!findProduct){
      return res.status(400).json({message: "No products found"})
  }
  return res.status(200).json(findProduct)


  }catch(err){
    return res.status(500).json({message: "Server Error"}) 
  } 


})

module.exports = router;