import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function BlogDetail() {
    let { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        const formData = JSON.stringify({
            id
        });
    
        fetch(`http://localhost:5000/api/blogdetail`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:formData
        })
        .then(response => response.json())
        .then((data) => setItem(data)) // Ensure it's an array for mapping
        .catch(error => console.error("Error fetching blog details:", error));
    }, []);

    return (
        
        <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-10">
      <div className="card shadow-lg border-0">
      <img
  src={item.photo}
  alt="Blog Image"
  className="card-img-top img-fluid blog-image"
/>

        <div className="card-body p-4">
          <h3 className="card-title text-center text-primary">{item.title}</h3>
          <p className="card-text text-muted">{item.content}</p>
        </div>
      </div>
    </div>
  </div>
  <style>
    {
        `
        .blog-image {
  width: 100%;
  height: auto;
  max-height: 400px; 
  object-fit: contain; /* No stretching, preserves quality */
  border-radius: 10px 10px 0 0;
}

        `
    }

    
  </style>
</div>


                )
            }
    
