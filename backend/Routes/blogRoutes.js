const express = require("express");
const {createBlog,viewBlogs,frontviewBlogs,deleteBlogs,deleteblogfromdb, UpdateBlogs} = require("../Controllers/BlogController");
// const  createUser1  = require("../controllers/signUpController");


const router = express.Router();//rputer bnaye


router.post("/insertblog", createBlog);
router.get("/viewblogs", viewBlogs);
router.post("/updateblog", UpdateBlogs);
router.post("/blogdetail", frontviewBlogs);

router.post("/deleteblog", deleteblogfromdb);

router.delete("/deleteblogs/:id", deleteBlogs);





module.exports = router;
