import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ViewDashbord = () => {
  
    const [items,setitems]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5001/api/viewdashbord")
        .then(response=>response.json())
       
        .then(data=>setitems(data))
        .catch(err=>console.log(err))
    },[]);

    const deletedata=async(dataid)=>{
      const formdata=JSON.stringify({
        dataid:dataid,
      })
      try{
        const response=await fetch("http://localhost:5001/api/deletedata",{
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
//     <div>
//        <h1 >View Data</h1>
//       <table class="table table-dark">
  
//   <tbody>
//     <tr class="table-active">
//         <th>Image</th>
//         <th>Name</th>
//         <th>Email</th>
           
//       <th>createdAt</th>
      
//     </tr>
//     {
//         items.map(item=>(
//             <tr class="table-active" key={item._id}>
//                 <td><img style={{backgroundSize:"cover",height:"50px"}}src={item.Photo ? item.Photo : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"}></img></td>
//                 <td>{item.Name}</td>
//                 <td>{item.Email}</td>
//                 <td>{item.createdAt}</td>
//             </tr>
//         )
//     )
//     }

    
//   </tbody>
// </table>
// <button className='' ><Link to="/SignUp">Add More</Link></button>
//     </div>

<div className="container mt-4">
      <h1 className="text-center mb-4">View Data</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={
                        item.Photo
                          ? item.Photo
                          : "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                      }
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>
                  <button className='btn btn-danger ' onClick={()=>deletedata(item._id)}><i class="fa-solid fa-trash"></i></button>
                </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-3">
        <Link to="/SignUp" className="btn btn-primary">
          Add More
        </Link>
      </div>

      {/* Extra Mobile Optimization */}
      <style>
        {`
          @media (max-width: 768px) {
            table {
              font-size: 14px;
            }
            th, td {
              padding: 10px;
            }
            img {
              width: 40px;
              height: 40px;
            }
          }
          @media (max-width: 480px) {
            table {
              font-size: 12px;
            }
            th, td {
              padding: 8px;
            }
            img {
              width: 35px;
              height: 35px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default ViewDashbord;

