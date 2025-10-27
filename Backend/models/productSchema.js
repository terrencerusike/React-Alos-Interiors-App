const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productname: { type: String, required: false },
  description: { type: String, required: false },
  price: { type: Number, required: false },
  category: {
  type: String,
  required: true
},
  imageUrl: { type: String, required: false }    
});

module.exports = mongoose.model("Product", productSchema);