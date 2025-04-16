const express=require("express");
const {LoginUser,UploadImage,deletedatafromdb,GetUserPhoto, viewdashbord} = require("../Controllers/LoginController");

const createNewUser = require("../Controllers/SignUpController");
const router=express.Router();
router.post("/login", LoginUser); 
router.post("/uploadimage",UploadImage);
router.post("/getuserphoto",GetUserPhoto);
router.post("/signup", createNewUser);
router.get("/viewdashbord", viewdashbord);
router.post("/deletedata", deletedatafromdb);
module.exports=router;