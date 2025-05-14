
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const GetAllUser = () => {
  
    const [items,setitems]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5001/api/viewusers")
        .then(response=>response.json())
        // .then(data=>console.log(data))
        .then(data=>setitems(data))
        .catch(err=>console.log(err))
    },[]);

    
    
    
  return (

<div className="container mt-4">
      <h1 className="text-center mb-4">View All Users</h1>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>UserName </th>
             
              <th>UserPhoto</th>
              <th>UserEmail</th>
              
              <th>Created At</th>
              
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.Name}</td>
                <td>
                  <img
                    src={item.Photo}
                    alt="Blog Thumbnail"
                    className="img-fluid rounded"
                    style={{ height: "50px", width: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{item.Email}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="text-center mt-3">
        <Link to="/admin/addcategories" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add More
        </Link>
      </div> */}
    </div>
  )
}

export default GetAllUser;

