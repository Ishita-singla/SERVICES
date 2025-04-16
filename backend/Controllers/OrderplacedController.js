const OrderModel=require("../Models/Orderplaced")
const UserModel =require("../Models/SignUpModel")
const sendAdminEmail=require("../UTILS/SendAdminEmail")
const placeorder = async (req, res) => {
    const { userId, cartItems, totalAmount } = req.body;

    const user = await UserModel.findById(userId);
    console.log("user is",user);
  
    console.log("userId:", userId);
    console.log("cartItems:", cartItems);
    console.log("totalAmount:", totalAmount);
  
    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }
  
    try {
      const order = new OrderModel({
        userId,
        cartItems,
        totalAmount,
        deliveryStatus: "Pending",
  deliveryPreference: req.body.deliveryPreference,
      });
  
      await order.save();
      await sendAdminEmail(order,user.Email);

      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error("Error placing order:", error); // ✅ Add this to find actual issue
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports=placeorder;
