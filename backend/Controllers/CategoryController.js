const CategoryModel = require("../Models/CategoryModel");


const category = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// const getCategoryById = async (req, res) => {
//   try {
//     const id=req.params;
//     console.log(id)
//     const category = await CategoryModel.findById(id)
//       // const category = await CategoryModel.findById(req.params.id);
//       // console.log(req.params.id);
//       if (!category) {
//           return res.status(404).json({ message: "Category not found" });
//       }
//       res.status(200).json(category);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };
// const getCategoryById = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const category = await CategoryModel.findById(id);

//       if (!category) return res.status(404).json({ message: "Category not found" });

//       res.status(200).json(category);
//   } catch (error) {
//       console.error("Error fetching category:", error.message);
//       res.status(500).json({ message: "Error fetching category" });
//   }
// };
const getCategoryById = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // ✅ Debugging
    const { id } = req.body; // ✅ Extract id safely

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    console.log("Error occurred while finding data:", err);
    return res.status(500).json({ message: "Error while fetching category", error: err.message });
  }
};
const updateCategory=async(req,res)=>{
  try{
    
    await CategoryModel.updateOne({_id:req.body.id},req.body)
    res.status(200).json({message:"ok"})
  }catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }


}

const getSubCategoryinUpdate = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // ✅ Debugging
    const { Categoryid,Subcategoryid } = req.body; // ✅ Extract id safely
    
    const category = await CategoryModel.findOne({_id:Categoryid});
    console.log(category);
    
    const subcategory=category.subcategories.find(sub=>sub._id.toString()===Subcategoryid);

    if (!subcategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(subcategory);
  } catch (err) {
    console.log("Error occurred while finding data:", err);
    return res.status(500).json({ message: "Error while fetching category", error: err.message });
  }
};
const updatesubCategory = async (req, res) => {
  try {
    const { categoryid, subcategoryid, subcategoryname, subcategoryimage, content } = req.body;

    // Category dhoondo
    const category = await CategoryModel.findById(categoryid);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Subcategory find karke update karo
    const subcategory = category.subcategories.id(subcategoryid);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    subcategory.subcategoryname = subcategoryname;
    subcategory.subcategoryimage = subcategoryimage;
    subcategory.content = content;

    await category.save();

    res.status(200).json({ message: "Subcategory updated successfully", subcategory });

  } catch (error) {
    res.status(500).json({ message: "Error updating subcategory" });
  }
};
const getSmallSubCategoryinUpdate = async (req, res) => {
  try {
    console.log("Request Body:", req.body);  // ✅ Debugging
    const { Categoryid,Subcategoryid,SmallSubcategoryid } = req.body; // ✅ Extract id safely
    
    const category = await CategoryModel.findOne({_id:Categoryid});
    console.log(category);
    
    const subcategory=category.subcategories.find(sub=>sub._id.toString()===Subcategoryid);
    const smallsubcategory=subcategory.smallsubcategories.find(sub=>sub._id.toString()===SmallSubcategoryid);


    if (!smallsubcategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(smallsubcategory);
  } catch (err) {
    console.log("Error occurred while finding data:", err);
    return res.status(500).json({ message: "Error while fetching category", error: err.message });
  }
};
const updatesmallsubCategory = async (req, res) => {
  try {
    const { categoryid, subcategoryid,smallsubcategoryid, smallsubcategoryname, smallsubcategoryimage, smallsubcategorycontent,Price} = req.body;

    // Category dhoondo
    const category = await CategoryModel.findById(categoryid);
    if (!category) return res.status(404).json({ message: "Category not found" });

    // Subcategory find karke update karo
    const subcategory = category.subcategories.id(subcategoryid);
    if (!subcategory) return res.status(404).json({ message: "Subcategory not found" });

    const smallsubcategory = subcategory.smallsubcategories.id(smallsubcategoryid);
    if (!smallsubcategory) return res.status(404).json({ message: "smallSubcategory not found" });

    smallsubcategory.smallsubcategoryname =  smallsubcategoryname;
    smallsubcategory.smallsubcategoryimage = smallsubcategoryimage;
    smallsubcategory.smallsubcategorycontent = smallsubcategorycontent;
    smallsubcategory.Price = Price;


    await category.save();

    res.status(200).json({ message: "Subcategory updated successfully", smallsubcategory });

  } catch (error) {
    res.status(500).json({ message: "Error updating smallsubcategory" });
  }
};





// const insertcategory = async (req, res) => {
//     try {
//       const { categoryname, categoryimage } = req.body;
//   console.log(req.body);
//       if (!categoryname || !categoryimage ) {
//         return res.status(400).json({ message: "All fields are required" });
//       }
  
//       const newcategory = new   CategoryModel({ categoryname,categoryimage });
//       console.log(newcategory);
//           await newcategory.save();
  
//       res.status(201).json({ message: "category added successfully!", newcategory });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Error creating category", error });
//     }
//   };

const insertcategory = async (req, res) => {
  try {
      const { categoryname, categoryimage } = req.body;
      if (!categoryname || !categoryimage) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const newcategory = new CategoryModel({ categoryname, categoryimage });
      await newcategory.save();
      res.status(201).json({ message: "Category added successfully!", newcategory });
  } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: error.message || "Error creating category" });
  }
};

const viewCategory=async(req,res)=>{
  try{
    const data = await CategoryModel.find();
  res.json(data)
  console.log("data fetch from database");
  }
  catch(err)
  {
    console.log("error occured while finding the data: "+err);
  }
}
const deletecategory=async(req,res)=>{
  try{
    await CategoryModel.deleteOne({_id:req.body.categoryid})
    res.status(200).json({message:"ok"})
  }
  catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }
}

// const insertsubcategory = async (req, res) => {
//   try {
//     const {  subcategoryname, subcategoryimage, content } = req.body;
//     const newSubCategory = new CategoryModel({
//       // categoryId,
//       subcategoryname,
//       subcategoryimage,
//      content,
//     });
//     await newSubCategory.save();
//     res.status(201).json({ message: "Sub-category added successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error adding sub-category" });
//   }
// }

const insertsubcategory = async (req, res) => {
  try {
    const { categoryname, subcategoryname, subcategoryimage, content } = req.body;

    // Category find karo
    const category = await CategoryModel.findOne({ categoryname });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Nayi subcategory add karo
    category.subcategories.push({
      subcategoryname,
      subcategoryimage,
      content,
    });

    // Save karo
    await category.save();

    res.status(201).json({ message: "Sub-category added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error adding sub-category" });
  }
};
// const deleteSubCategory = async (req, res) => {
//   try {
//     const { categoryid, subcategoryid } = req.body;

//     if (!categoryid || !subcategoryid) {
//       return res.status(400).json({ message: "Category ID and Sub-category ID are required" });
//     }

//     // कैटेगरी ढूंढें जिसमें यह सब-कैटेगरी मौजूद है
//     const category = await CategoryModel.findById(categoryid);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // सब-कैटेगरी को हटाएँ
//     const updatedSubCategories = category.subcategories.filter(
//       (sub) => sub._id.toString() !== subcategoryid
//     );

//     if (category.subcategories.length === updatedSubCategories.length) {
//       return res.status(404).json({ message: "Sub-category not found" });
//     }

//     // अपडेट करके सेव करें
//     category.subcategories = updatedSubCategories;
//     await category.save();

//     console.log(`Sub-category deleted: ${subcategoryid} from category ${categoryid}`);
//     res.status(200).json({ message: "Sub-category deleted successfully" });
//   } catch (err) {
//     console.error("Error while deleting sub-category:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const deleteSubCategory = async (req, res) => {
  try {
    const { categoryid, subcategoryid } = req.body;

    if (!categoryid || !subcategoryid) {
      return res.status(400).json({ message: "Category ID and Sub-category ID are required" });
    }

    // कैटेगरी खोजें
    const category = await CategoryModel.findById(categoryid);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // सिर्फ सब-कैटेगरी हटाएँ, पूरी कैटेगरी नहीं
    category.subcategories = category.subcategories.filter(sub => sub._id.toString() !== subcategoryid);

    await category.save(); // अपडेट को सेव करें

    res.status(200).json({ message: "Sub-category deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSmallSubCategory = async (req, res) => {
  try {
    const { categoryid, subcategoryid, smallsubcategoryid } = req.body;

    if (!categoryid || !subcategoryid || !smallsubcategoryid) {
      return res.status(400).json({ message: "Category ID, Sub-category ID, Small-Sub-category ID are required" });
    }

    // ✅ कैटेगरी खोजें
    const category = await CategoryModel.findById(categoryid);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ सबकैटेगरी खोजें
    const subcategory = category.subcategories.find(sub => sub._id.toString() === subcategoryid);
    if (!subcategory) {
      return res.status(404).json({ message: "Sub-category not found" });
    }

    // ✅ छोटे सबकैटेगरी को फ़िल्टर करके हटाएँ
    subcategory.smallsubcategories = subcategory.smallsubcategories.filter(
      smallsub => smallsub._id.toString() !== smallsubcategoryid
    );

    await category.save(); // ✅ अपडेट को सेव करें

    res.status(200).json({ message: "Small sub-category deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  sub._id MongoDB ObjectId hota hai (jo ek object format me hota hai).

// .toString() lagane se ObjectId ko ek string me convert kar diya jata hai.

// subcategoryid jo API request (req.body) me aaya hai, wo ek string hota hai.

// Comparison (===) string format me hoti hai, isiliye dono ko same format me convert karna zaroori hai.





const getSubcategories = async (req, res) => {
  try {
    const { categoryname } = req.params;
    const category = await CategoryModel.findOne({ categoryname });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category.subcategories); // ✅ Sirf subcategories bhej rahe hain
  } catch (error) {
    res.status(500).json({ message: "Error fetching subcategories", error });
  }
};

const insertsmallsubcategory=async(req,res)=>{
  try {
    const { categoryname, subcategoryname,smallsubcategoryname, smallsubcategoryimage, smallsubcategorycontent,Price } = req.body;

    // Category find karo
    const category = await CategoryModel.findOne({ categoryname });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    // ✅ Ab subcategory find karo
    const subcategory = category.subcategories.find(
      (sub) => sub.subcategoryname === subcategoryname
    );

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // ✅ Small subcategory ko push karo
    subcategory.smallsubcategories.push({
      smallsubcategoryname,
      smallsubcategoryimage,
      smallsubcategorycontent,
      Price
    });

    // ✅ Save the category with updated subcategory
    await category.save();

    res.status(201).json({ message: "Small sub-category added successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error adding small sub-category" });
  }
};
 // Ensure correct path

// const updateCategory = async (req, res) => {
//     const { id, categoryname, categoryimage } = req.body;

//     try {
//         // Check if category exists
//         const category = await CategoryModel.findById(id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }

//         // Update category fields
//         category.categoryname = categoryname;
// category.categoryimage = categoryimage;


//         // Save updated category
//         await category.save();

//         res.status(200).json({ message: "Category updated successfully", category });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const getSubsmallcategoriesinfront = async (req, res) => {
  try {
      const { categoryname, subcategoryname } = req.params; 
      
      console.log(req.params);
      if (!categoryname || !subcategoryname) {
          return res.status(400).json({ message: "Categoryname and Subcategoryname are required" });
      }

      const category = await CategoryModel.findOne({ categoryname });
      console.log(category);

      if (!category) {
          return res.status(404).json({ message: "Category not found" });
      }

      const subcategory = category.subcategories.find(
          (sub) => sub.subcategoryname === subcategoryname
      );

      if (!subcategory || !subcategory.smallsubcategories) {
          return res.status(404).json({ message: "Small Subcategories not found" });
      }

      res.json(subcategory.smallsubcategories);
  } catch (error) {
      res.status(500).json({ message: "Error fetching small subcategories", error });
  }
};



module.exports = {insertcategory,category,insertsubcategory,getSubcategories,insertsmallsubcategory,viewCategory,deletecategory,deleteSubCategory,deleteSmallSubCategory,getCategoryById,updateCategory,getSubCategoryinUpdate,updatesubCategory,getSmallSubCategoryinUpdate,updatesmallsubCategory,getSubsmallcategoriesinfront};
