// const mongoose=require("mongoose")
// const orderSchema=new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//       },
//       cartItems:[
//         {
//             name:{
//                 type:String,
//                 required:true
//             },
//             image:{
//                 type:String,
//                 required:true
//             },
//             Price:{
//                 type:Number,
//                 required:true
//             },
//             quantity:{
//                 type:Number,
//                 required:true
//             },
//             category:{
//                 type:String,
//                 required:false
//             },
//             // description:{
//             //     type:String,
//             //     required:true
//             // },

//         }
//       ],
//       totalAmount:{
//         type:Number,
//         required:true
//       },
//       paymentStatus:{
//         type:String,
//         enum:["Pending","Paid","Failed"],
//         default:"Pending"

//       },
//       deliveryStatus:{
//         type:String,
//         enum:["Pending","Shipped","Delivered"],
//         default:"Pending"
//       },
//       orderDate:{
//         type:Date,
//         default:Date.now
//       },
//         deliveryDate:{
//             type:Date
//         },
// })
// const OrderModel=mongoose.model("Order",orderSchema)
// module.exports=OrderModel



const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  cartItems: [
    {
      name: { type: String, required: true },
      image: { type: String, required: true },
      Price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      category: { type: String }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Rejected"],
    default: "Pending"
  },
  deliveryPreference: {
    type: String,
    default: "Not selected",
  },
  
  orderDate: {
    type: Date,
    default: Date.now
  },
  finalDeliveryType: {
    type: String,
    default: "Not decided",  // admin-confirmed fast/normal
  },
  deliveryDate: { type: Date }
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
