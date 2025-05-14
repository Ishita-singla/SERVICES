const OrderModel=require("../Models/Orderplaced")
const UserModel =require("../Models/SignUpModel")
const sendAdminEmail=require("../UTILS/SendAdminEmail")
// const placeorder = async (req, res) => {
//     const { userId, cartItems, totalAmount } = req.body;

//     const user = await UserModel.findById(userId);
//     console.log("user is",user);
  
//     console.log("userId:", userId);
//     console.log("cartItems:", cartItems);
//     console.log("totalAmount:", totalAmount);
  
//     if (!userId || !cartItems || cartItems.length === 0) {
//       return res.status(400).json({ message: "Invalid order data" });
//     }
  
//     try {
//       const order = new OrderModel({
//         userId,
//         cartItems,
//         totalAmount,
//         deliveryStatus: "Pending",
//   deliveryPreference: req.body.deliveryPreference,
//       });
  
//       await order.save();
//       await sendAdminEmail(order,user.Email);

//       res.status(201).json({ message: "Order placed successfully", order });
//     } catch (error) {
//       console.error("Error placing order:", error); // ✅ Add this to find actual issue
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };
  
// const placeorder = async (req, res) => {
//   const { userId, cartItems, totalAmount, address, city, pincode, serviceDate, deliveryType } = req.body;

//   if (!userId || !cartItems || cartItems.length === 0 || !serviceDate || !deliveryType) {
//     return res.status(400).json({ message: "Invalid order data" });
//   }

//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     const totalAmount = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

//     if (deliveryType === "Fast") {
//       totalAmount += 50;
//     }

//     const order = new OrderModel({
//       userId,
//       cartItems,
//       totalAmount,
//       city,
//       address,
//       pincode,
//       serviceDate: new Date(serviceDate),
//       deliveryType,
//       deliveryStatus: "Pending",
//       deliveryDate: null,
//     });

//     await order.save();
//     await sendAdminEmail(order, user.Email);

//     res.status(201).json({ message: "Order placed successfully", order }); // ✅ INCLUDE order in response
//   } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const placeorder = async (req, res) => {
  const { userId, cartItems, address, city, pincode, serviceDate, deliveryType } = req.body;

  if (!userId || !cartItems || cartItems.length === 0 || !serviceDate || !deliveryType) {
    return res.status(400).json({ message: "Invalid order data" });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

// If frontend already sends price * quantity → only sum prices directly
let calculatedTotalAmount = cartItems.reduce((total, item) => total + item.Price, 0);

    if (deliveryType === "Fast") {
      calculatedTotalAmount += 50;
    }

    let deliveryDays = deliveryType === "Fast" ? 2 : 4;
    const estimatedDeliveryDate = new Date(serviceDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + deliveryDays);

    console.log("Service Date:", serviceDate);
    console.log("Estimated Delivery Date:", estimatedDeliveryDate);

    const order = new OrderModel({
      userId,
      cartItems,
      totalAmount: calculatedTotalAmount,
      city,
      address,
      pincode,
      serviceDate: new Date(serviceDate),
      deliveryType,
      deliveryStatus: "Pending",
      deliveryDate: estimatedDeliveryDate, // ✅ SET DELIVERY DATE
    });

    await order.save();
    console.log("Order after saving:", order); // Check if deliveryDate is saved

    await sendAdminEmail(order, user.Email);

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update payment status for an order
const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentId } = req.body;

    const order = await OrderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentId = paymentId;
    order.paymentDate = new Date();
    order.paymentStatus = "Paid";

    await order.save();

    res.status(200).json({ message: "Payment updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating payment", error: err });
  }
};
module.exports={placeorder,updatePaymentStatus};
