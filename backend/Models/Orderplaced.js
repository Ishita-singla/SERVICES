// // const mongoose=require("mongoose")
// // const orderSchema=new mongoose.Schema({
// //     userId: {
// //         type: mongoose.Schema.Types.ObjectId,
// //         ref: "User",
// //         required: true
// //       },
// //       cartItems:[
// //         {
// //             name:{
// //                 type:String,
// //                 required:true
// //             },
// //             image:{
// //                 type:String,
// //                 required:true
// //             },
// //             Price:{
// //                 type:Number,
// //                 required:true
// //             },
// //             quantity:{
// //                 type:Number,
// //                 required:true
// //             },
// //             category:{
// //                 type:String,
// //                 required:false
// //             },
// //             // description:{
// //             //     type:String,
// //             //     required:true
// //             // },

// //         }
// //       ],
// //       totalAmount:{
// //         type:Number,
// //         required:true
// //       },
// //       paymentStatus:{
// //         type:String,
// //         enum:["Pending","Paid","Failed"],
// //         default:"Pending"

// //       },
// //       deliveryStatus:{
// //         type:String,
// //         enum:["Pending","Shipped","Delivered"],
// //         default:"Pending"
// //       },
// //       orderDate:{
// //         type:Date,
// //         default:Date.now
// //       },
// //         deliveryDate:{
// //             type:Date
// //         },
// // })
// // const OrderModel=mongoose.model("Order",orderSchema)
// // module.exports=OrderModel



// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   cartItems: [
//     {
//       name: { type: String, required: true },
//       image: { type: String, required: true },
//       Price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//       category: { type: String }
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   address:String,
//       city:String,
//       pincode:String,
//             serviceDate:{
//         type:Date,
//         required:true
//       },
//       deliveryType:{
//         type:String,
//         enum:["Fast","Slow"],
// required:true},

//       },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Paid", "Failed"],
//     default: "Pending"
//   },
//   paymentId: {
//     type: String,
//     default: null,
//   },
//   deliveryStatus: {
//     type: String,
//     enum: ["Pending", "Shipped", "Delivered", "Rejected"],
//     default: "Pending"
//   },
//   deliveryPreference: {
//     type: String,
//     default: "Not selected",
//   },
  

// deliveryDate:{
//   type:Date
// },
  
//   orderDate: {
//     type: Date,
//     default: Date.now
//   },
//   paymentDate: {
//     type: Date,
//     default: null,
//   },
//   finalDeliveryType: {
//     type: String,
//     default: "Not decided",  // admin-confirmed fast/normal
//   },
// });

// const OrderModel = mongoose.model("Order", orderSchema);
// module.exports = OrderModel;

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

  address: { type: String },
  city: { type: String },
  pincode: { type: String },

  serviceDate: {
    type: Date,
    required: true
  },
  deliveryType: {
    type: String,
    enum: ["Fast", "Slow"],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },
  paymentId: {
    type: String,
    default: null
  },
  paymentDate: {
    type: Date,
    default: null
  },

  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Rejected"],
    default: "Pending"
  },
  deliveryPreference: {
    type: String,
    default: "Not selected"
  },
  finalDeliveryType: {
    type: String,
    default: "Not decided"  // Admin-confirmed fast/slow
  },
  deliveryDate: {
    type: Date
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
