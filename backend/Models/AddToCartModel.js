const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
 subcategoryname: { type: String, required: true },
  smallsubcategoryname: { type: String, required: true }, // Cloudinary Image URL
  smallsubcategoryimage: { type: String, required: true },
  Price: { type: String, required: true },

  
  createdAt: { type: Date, default: Date.now },
});

const AddToCart=mongoose.model("AddtoCart",CartSchema);
module.exports = AddToCart;