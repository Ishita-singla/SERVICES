const OrderModel = require("../Models/Orderplaced");
const sendUserEmail=require("../UTILS/SendUserEmail")


// Admin controller to set delivery date


// const getpendingOrder=async(req,res)=>{
//     try{
//         const orders=await OrderModel.find({deliveryStatus:"Pending"}).populate("userId");
//         res.status(201).json({message:"pending orders",orders});
//     }
//     catch(err){
//         res.status(500).json({message:"error during placed order",err});

//     }


// }


// const setDeliveryDate = async (req, res) => {
//   const { orderId } = req.params;
//   const { deliveryDate } = req.body;

//   if (!deliveryDate) {
//     return res.status(400).json({ message: "Delivery date is required" });
//   }

//   try {
//     const updatedOrder = await OrderModel.findByIdAndUpdate(
//       orderId,
//       { deliveryDate, deliveryStatus: "Shipped" },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     res.status(200).json({
//       message: "Delivery date updated successfully",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Error updating delivery date:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = 
//   {setDeliveryDate,getpendingOrder};


// PUT: Update order by ID (used for reject/proceed)
// const updateOrder = async (req, res) => {
//   try {
//     const updated = await OrderModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     await sendUserEmail(updated._id,req.body.deliveryStatus,updated.userId.Email)
//     res.json({ message: "Order updated", updated });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

const updateOrder = async (req, res) => {
  try {
    const updated = await OrderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('userId'); // ✅ Needed to access user email

    // ✅ Confirm email exists
    if (!updated.userId || !updated.userId.Email) {
      return res.status(400).json({ message: "User email not found" });
    }

    // ✅ Send email
    await sendUserEmail(
      updated._id,
      req.body.deliveryStatus,
      updated.userId.Email
    );

    res.json({ message: "Order updated", updated });
  } catch (err) {
    console.error("❌ Order update failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// const OrderModel = require("../models/orderModel");

// const updateOrder = async (req, res) => {
//   try {
//     const order = await OrderModel.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Update delivery status
//     if (req.body.deliveryStatus) {
//       order.deliveryStatus = req.body.deliveryStatus;
//     }

//     // If admin is proceeding to ship, calculate based on user's preference
//     if (req.body.deliveryStatus === "Shipped") {
//       const preference = order.deliveryPreference || "normal"; // fallback if null
//       let deliveryDate = new Date(order.orderDate);

//       if (preference === "fast") {
//         deliveryDate.setDate(deliveryDate.getDate() + 3);
//         order.finalDeliveryType = "fast";
//       } else {
//         deliveryDate.setDate(deliveryDate.getDate() + 7);
//         order.finalDeliveryType = "normal";
//       }

//       order.deliveryDate = deliveryDate;
//       order.expectedDelivery = deliveryDate;
//     }

//     await order.save();
//     res.json({ message: "Order updated", order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// const updateOrder = async (req, res) => {
//   try {
//     const order = await OrderModel.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // If admin is rejecting
//     if (req.body.deliveryStatus === "Rejected") {
//       order.deliveryStatus = "Rejected";
//     }

//     // If admin is proceeding to ship
//     if (req.body.deliveryStatus === "Shipped") {
//       order.deliveryDate = req.body.deliveryDate;
//       order.expectedDelivery = req.body.deliveryDate;

//       if (req.body.deliveryType) {
//         order.finalDeliveryType = req.body.deliveryType;
//       }

//       order.deliveryStatus = "Shipped";
//     }

//     await order.save();
//     res.json({ message: "Order updated", order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// GET: Orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

// GET: All orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("userId");
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders" });
  }
};

module.exports = 
 {getAllOrders,getUserOrders,updateOrder};
