const OrderPayment = require("../Models/PaymentModel");

// Place an order
const placeOrder = async (req, res) => {
    console.log(  "placeorder"+req.body);  // Debugging line to check the request body

  const { userId, items, shippingAddress, totalAmount } = req.body;

  if (!userId || !items || !shippingAddress || !totalAmount) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newOrder = new OrderPayment({
      userId,
      items,
      shippingAddress,
      totalAmount,
      paymentStatus: "Pending", // optional default
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Order failed", error: err.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { orderId } = req.params;
  const { paymentId, paymentStatus } = req.body;

  try {
    const updatedOrder = await OrderPayment.findByIdAndUpdate(
      orderId,
      { paymentId, paymentStatus },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to update payment", error: err });
  }
};


module.exports = { placeOrder,updatePaymentStatus };
