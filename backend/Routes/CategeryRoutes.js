const express = require("express");
const {category,insertcategory,insertsubcategory, getSubcategories, insertsmallsubcategory, viewCategory, deletecategory, deleteSubCategory, deleteSmallSubCategory, getCategoryById, updateCategory, getSubCategoryinUpdate, updatesubCategory, getSmallSubCategoryinUpdate, updatesmallsubCategory, getSubsmallcategoriesinfront} = require("../Controllers/CategoryController");
const { Addtocart, viewAddtocart, deleteCartItem } = require("../Controllers/AddToCartController");
const  { getAllOrders, updateOrder, getUserOrders}  = require("../Controllers/ViewAdminOrders");
const{placeorder, updatePaymentStatus}=require("../Controllers/OrderplacedController")
const { getUserCount, getUser, countBlogs, getOrderStatusCount } = require("../Controllers/GetUserCount");


const router = express.Router();

router.get("/categories", category);
router.post("/insertcategory", insertcategory);
router.post("/insertsubcategory", insertsubcategory);
router.post("/insertsmallsubcategory", insertsmallsubcategory);
router.get("/subcategories/:categoryname", getSubcategories);
router.get("/viewcategory", viewCategory);
router.get("/getsubsmallcategory/:categoryname/:subcategoryname", getSubsmallcategoriesinfront);


router.post("/deletecategory", deletecategory);
router.post("/deletesubcategory", deleteSubCategory);
router.post("/deletesmallsubcategory", deleteSmallSubCategory);
router.post("/category", getCategoryById);
router.post("/subcategory",getSubCategoryinUpdate);
router.post("/smallsubcategory",getSmallSubCategoryinUpdate);


router.post("/updatecategory", updateCategory);
router.post("/updatesubcategory", updatesubCategory);
router.post("/updatesmallsubcategory", updatesmallsubCategory);

router.post("/addtocart", Addtocart);
router.get("/viewaddtocart", viewAddtocart);
router.delete("/deleteitem/:id", deleteCartItem);


router.post("/orderplaced",placeorder);
router.put("/updatepayment/:orderId", updatePaymentStatus);


// router.put("/set-delivery-date/:orderId", setDeliveryDate);

// router.get("/getorders",getpendingOrder)

// router.get("/user/:userId", getUserOrders);

router.put("/updateorder/:id", updateOrder);

// Get all orders (admin)
router.get("/getorders", getAllOrders);

// Get orders by userId (user)
router.get("/user/:userId", getUserOrders);


router.get("/viewusers",getUser);


router.get("/count-blogs", countBlogs); // 👈 Add this line
router.get("/order-status-count", getOrderStatusCount); // 👈 New route






module.exports = router;
