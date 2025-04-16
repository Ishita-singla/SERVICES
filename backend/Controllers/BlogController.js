const Blogmodel = require("../Models/BlogModel");


console.log(Blogmodel);

// ✅ Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, photo, content } = req.body;
console.log(req.body);
    if (!title || !photo || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new   Blogmodel({ title, photo, content });
    console.log(newBlog);
        await newBlog.save();

    res.status(201).json({ message: "Blog created successfully!", newBlog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// ✅ Get all blog posts
// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blogs.find().sort({ createdAt: -1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching blogs", error });
//   }
// };

//get blog
const viewBlogs=async(req,res)=>{
  try{
    const data = await Blogmodel.find();
  res.json(data)
  console.log("data fetch from database");
  }
  catch(err)
  {
    console.log("error occured while finding the data: "+err);
  }
}

const frontviewBlogs=async(req,res)=>{
  try{
    const id=req.body.id;
    console.log(id)
    const blog = await Blogmodel.findById(id);

    if(!blog){
      return res.status(404).json({message:"blog not found"});
    }
  
    res.status(200).json(blog);
  }
  catch(err)
  {
    console.log("error occured while finding the data: "+err);
    return res.status(500).json({message:"error while blog",err:err.message});
  }
}

const deleteBlogs = async (req, res) => {
  try {
      const { id } = req.params;
      const deleteBlogs = await Blogmodel.findByIdAndDelete(id);

      if (!deleteBlogs) {
          return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteblogfromdb=async(req,res)=>{
  try{
    await Blogmodel.deleteOne({_id:req.body.blogid})
    res.status(200).json({message:"ok"})
  }
  catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }
}

const UpdateBlogs=async(req,res)=>{
  try{
    
    await Blogmodel.updateOne({_id:req.body.id},req.body)
    res.status(200).json({message:"ok"})
  }catch(err){
    res.status(500).json({message:"error"})
    console.log(err);
  }


}




module.exports ={createBlog,viewBlogs,frontviewBlogs,deleteBlogs,deleteblogfromdb,UpdateBlogs};
