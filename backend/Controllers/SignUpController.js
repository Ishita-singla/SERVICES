const User= require("../Models/SignUpModel");
const bcrypt=require("bcrypt");

const createNewUser = async (req, res) => {
  try {
    console.log("🟢 Request Body:", req.body);
    const {Email,Password,Name}=req.body;
    if (!Email || !Password || !Name) {
      return res.status(400).json({ message: "Email,Name & Password required" });
    }
    const exitingUser=await User.findOne({Email:Email})
     
    if(exitingUser){
      return res.status(400).json({
        message: "User already exit"
      })
    }
    
    const hashedpassword=await bcrypt.hash(Password,10)

    const newUser = new User({
      Name,Email,Password:hashedpassword,role:"user"
    })
   await newUser.save();
   console.log("User saved successfully");
    res.status(200).json({ message: "User created successfully" });
  } 
  catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports=createNewUser;


