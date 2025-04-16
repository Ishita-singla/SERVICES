// controllers/orderController.js
const OrderModel = require("../Models/Orderplaced");


exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await OrderModel.find({ userId }).sort({ orderDate: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching past orders:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
