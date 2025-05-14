const express=require("express");
const cors=require("cors");
const connectDB = require("./Config/Db");
const CategoryRoutes=require("./Routes/CategeryRoutes")
const FormRoutes=require("./Routes/FormRoutes")
const blogRoutes = require("./Routes/blogRoutes");
const dotenv=require("dotenv");

const app = express();
const colors=require("colors");
const port =5001;

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

app.use("/api", CategoryRoutes);  //ka matlab hai ki ab request "/api/user" mope jayegi
app.use("/api",FormRoutes);
app.use("/api",blogRoutes);

app.listen(port,()=>{
    console.log(colors.grey("server is running on port ")+colors.red(port));
})

