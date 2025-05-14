import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [items,setItems]=useState([]);

    
    const fetchData=async()=>{
        try{
            const response=await axios.get("http://localhost:5001/api/viewblogs");
            console.log("blog data",response.data);
            setItems(response.data);
        }catch(err){
            console.log("error during fetching blogs data",err);
        }
    };
    useEffect(()=>{
        fetchData();
        },[]);
    

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        try {
            await axios.delete(`http://localhost:5001/api/deleteblogs/${id}`);
            alert("Blog deleted successfully!");
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error("Failed to delete blog:", error);
            alert("Failed to delete blog");
        }
    };

  return (
    <div className="container my-5">
    <h2 className="text-center mb-4">Blogs</h2>
    <div className="row">
        {items.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
                <div className="card h-100">
                    <img src={item.photo} alt={item.title} className="card-img-top p-5" style={{ height: "250px", width: "100%", objectFit: "cover" }}  />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.content.substring(0, 50)}...</p>
                        <div className="mb-0 d-flex flex-column align-items-center ">
                            <Link to={`/blogdetail/${item._id}`} className="btn btn-primary btn-sm">
                            
                                Read More
                            </Link>
                            <button className="btn btn-danger btn-sm mt-2" onClick={() => handleDelete(item._id)}>
                                Delete
                            </button>
                            {/* <button className="btn btn-danger btn-sm" >
                                Delete
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default Blogs
