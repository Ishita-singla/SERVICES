const mongoose=require("mongoose");
const formSchema=new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
  Password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  Photo:{ type: String },
  role:{type:String,enum:["user","admin"],default:"user"}
})
const User=mongoose.model("User",formSchema);
module.exports=User;