const User = require("../Models/SignUpModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const LoginUser = async (req, res) => {
  try {
    const{Email,Password}=req.body;
    const user=await User.findOne({Email:Email});
    if(!user){
      return res.status(400).json({
        message: "user not found"
      })
    }
    const isMatch=await bcrypt.compare(Password,user.Password);
    if(!isMatch){
      return res.status(401).json({
        message:"Invalid credentials"
      })
    }

    // code to get token
    const token=jwt.sign({email:user.Email,userId:user._id,role:user.role},
      "fsh687$",{expiresIn:"1d"}
    )
    // if (Password !== user.Password) {
    //   return res.status(401).json({
    //     message: "Invalid credentials",
    //   });
    // }
    res.status(200).json({
      message: "succesfuly login",
      token:token,
      role:user.role,
      Email:user.Email,
      Name: user.Name,
      user:user._id,
     
   })
  }
    catch(err){
      res.status(400).json({
        message:"error in login"
      })
    }
  }


  const UploadImage = async (req, res) => {
    try {
      const { Email, Photo } = req.body;
      console.log(req.body);
  
      // Find the user by Email
      let user = await User.findOne({ Email });
  
      if (!user) {
        return res.status(403).json({ message: "User not registered. Please register first." });
      }
  
      // Find the existing upload entry for the user
      let uploadEntry = await User.findOne({ Email });
  
      if (!uploadEntry) {
        // ✅ Create new upload entry (WITHOUT userId reference)
        uploadEntry = new User({ Email, Photo });
        await uploadEntry.save();
        return res.status(201).json({ message: "Profile pic uploaded successfully", Photo });
      } else {
        // ✅ Update existing entry
        uploadEntry.Photo = Photo;
        await uploadEntry.save();
        return res.status(200).json({ message: "Profile pic updated", Photo });
      }
  
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // यह getUser API है, जो database से user की profile picture (photo) fetch करने के लिए है।
const GetUserPhoto = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log("Received Email in Backend:", req.body);
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Found", Photo: user.Photo });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewdashbord=async(req,res)=>{
  try{
    const data = await User.find();
  res.json(data)
  console.log("data fetch from database");
  }
  catch(err)
  {
    console.log("error occured while finding the data: "+err);
  }
}

const deletedatafromdb=async(req,res)=>{
  try{
    await User.deleteOne({_id:req.body.dataid})
    res.status(200).json({message:"ok"})
  }
  catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }
}
  module.exports={LoginUser,UploadImage,GetUserPhoto,viewdashbord,deletedatafromdb};