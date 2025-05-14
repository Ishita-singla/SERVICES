const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        quantity: Number,
      }
    ],
    shippingAddress: {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    totalAmount: Number,
    paymentStatus: { type: String, default: 'Pending' }, // New field
    paymentId: { type: String }, // Razorpay Payment ID (after success)
    status: { type: String, default: 'Pending' }, // Order Status
  }, { timestamps: true });
  
  const OrderPayment=mongoose.model('OrderPayment', orderSchema);
  module.exports=OrderPayment;
  