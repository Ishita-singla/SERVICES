const AddToCart = require("../Models/AddToCartModel");

const Addtocart = async (req, res) => {
    try {
      const {subcategoryname,smallsubcategoryname ,smallsubcategoryimage,Price  } = req.body;
  console.log(req.body);
      if (!subcategoryname|| !smallsubcategoryname || !smallsubcategoryimage || !Price) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newAdd = new AddToCart({ subcategoryname,smallsubcategoryname ,smallsubcategoryimage,Price});
      console.log(newAdd);
          await newAdd.save();
  
      res.status(201).json({ message: "Add to acrt successfully!", newAdd });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error adding to cart", error });
    }
  };
  const viewAddtocart=async(req,res)=>{
    try{
      const data = await AddToCart.find();
    res.json(data)
    console.log("data fetch from database");
    }
    catch(err)
    {
      console.log("error occured while finding the data: "+err);
    }
  }
  const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;

        // MongoDB से आइटम डिलीट करें
        const deletedItem = await AddToCart.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ message: "Server error" });
    }
};


  module.exports={Addtocart,viewAddtocart,deleteCartItem};