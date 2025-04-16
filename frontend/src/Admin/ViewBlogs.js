
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ViewBlogs = () => {
  
    const [items,setitems]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/api/viewblogs")
        .then(response=>response.json())
        // .then(data=>console.log(data))
        .then(data=>setitems(data))
        .catch(err=>console.log(err))
    },[]);

    
    const deleteblog=async(blogid)=>{
      const formdata=JSON.stringify({
        blogid:blogid,
      })
      try{
        const response=await fetch("http://localhost:5000/api/deleteblog",{
          headers:{"Content-type":"application/json"},
          method:"Post",
          body:formdata
        })

        if(response.ok){
          alert("blog deleted");
          // refresh krege taki blog delete ho jaye
          setTimeout(()=>{
            window.location.reload();
          },1000);
        }
        else{
          alert("error");
        }

      }
      catch(err){
       console.log(err);
      }
    }
    
  return (


<div className="container mt-4">
      <h1 className="text-center mb-4">View Blogs</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Photo</th>
              <th>Content</th>
              <th>Created At</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>
                  <img
                    src={item.photo}
                    alt="Blog Thumbnail"
                    className="img-fluid rounded"
                    style={{ height: "50px", width: "50px", objectFit: "cover" }}
                  />
                </td>
                <td className="text-truncate" style={{ maxWidth: "200px" }}>{item.content}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteblog(item._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
                <td>

              <Link to={`/admindashboard/updateblogs/${item._id}`}>  <button
                    className="btn  "
                    
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button></Link>  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-3">
        <Link to="/admindashboard/addBlogs" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add More
        </Link>
      </div>
    </div>
  )
}

export default ViewBlogs;

